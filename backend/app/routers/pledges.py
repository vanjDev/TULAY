from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth import require_participant_id
from ..models import Participant, Pledge
from ..schemas import MessageOut, PledgeCreate, PledgeOut

router = APIRouter(prefix="/api/pledges", tags=["pledges"])

DEFAULT_PLEDGE = (
    "I pledge to pause before I joke, listen before I judge, "
    "and choose acceptance over tolerance."
)


@router.get("", response_model=list[PledgeOut])
def list_pledges(db: Session = Depends(get_db)):
    return (
        db.query(Pledge)
        .filter(Pledge.is_visible.is_(True))
        .order_by(Pledge.created_at.desc())
        .limit(100)
        .all()
    )


@router.post("", response_model=MessageOut, status_code=status.HTTP_201_CREATED)
def create_pledge(
    payload: PledgeCreate,
    participant_id: int = Depends(require_participant_id),
    db: Session = Depends(get_db),
):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if participant is None:
        raise HTTPException(status_code=404, detail="Participant not found")

    message = (payload.message or DEFAULT_PLEDGE).strip() or DEFAULT_PLEDGE
    name = (participant.username or participant.full_name).strip() or "T.U.L.A.Y. participant"
    pledge = Pledge(
        participant_id=participant.id,
        display_name=name[:80],
        message=message[:500],
    )
    db.add(pledge)
    db.commit()
    return {"message": "Salamat! Naka-post na ang pledge mo sa wall."}
