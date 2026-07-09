from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Pledge
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


@router.post("", response_model=MessageOut, status_code=201)
def create_pledge(payload: PledgeCreate, db: Session = Depends(get_db)):
    name = (payload.display_name or "Anonymous").strip() or "Anonymous"
    message = (payload.message or DEFAULT_PLEDGE).strip() or DEFAULT_PLEDGE
    pledge = Pledge(display_name=name[:80], message=message[:500])
    db.add(pledge)
    db.commit()
    return {"message": "Salamat! Naka-post na ang pledge mo sa wall."}
