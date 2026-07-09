from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import create_admin_token, require_admin, verify_password
from ..database import get_db
from ..models import Pledge, QuizScenario, Story
from ..schemas import AdminLogin, MessageOut, StatsOut, StoryAdminOut, TokenOut

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/login", response_model=TokenOut)
def admin_login(payload: AdminLogin):
    if not verify_password(payload.password):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return TokenOut(access_token=create_admin_token())


@router.get("/stats", response_model=StatsOut)
def stats(_: str = Depends(require_admin), db: Session = Depends(get_db)):
    return StatsOut(
        pending_stories=db.query(Story).filter(Story.status == "pending").count(),
        approved_stories=db.query(Story).filter(Story.status == "approved").count(),
        rejected_stories=db.query(Story).filter(Story.status == "rejected").count(),
        pledges=db.query(Pledge).count(),
        quiz_scenarios=db.query(QuizScenario).count(),
    )


@router.get("/stories", response_model=list[StoryAdminOut])
def list_all_stories(
    status: str | None = None,
    _: str = Depends(require_admin),
    db: Session = Depends(get_db),
):
    q = db.query(Story).order_by(Story.created_at.desc())
    if status:
        q = q.filter(Story.status == status)
    return q.all()


@router.post("/stories/{story_id}/approve", response_model=StoryAdminOut)
def approve_story(
    story_id: int,
    _: str = Depends(require_admin),
    db: Session = Depends(get_db),
):
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    story.status = "approved"
    db.commit()
    db.refresh(story)
    return story


@router.post("/stories/{story_id}/reject", response_model=StoryAdminOut)
def reject_story(
    story_id: int,
    _: str = Depends(require_admin),
    db: Session = Depends(get_db),
):
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    story.status = "rejected"
    db.commit()
    db.refresh(story)
    return story


@router.post("/pledges/{pledge_id}/hide", response_model=MessageOut)
def hide_pledge(
    pledge_id: int,
    _: str = Depends(require_admin),
    db: Session = Depends(get_db),
):
    pledge = db.query(Pledge).filter(Pledge.id == pledge_id).first()
    if not pledge:
        raise HTTPException(status_code=404, detail="Pledge not found")
    pledge.is_visible = False
    db.commit()
    return {"message": "Pledge hidden"}
