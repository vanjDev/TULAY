from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Story
from ..schemas import MessageOut, StoryCreate, StoryOut

router = APIRouter(prefix="/api/stories", tags=["stories"])

CATEGORY_PROMPTS = {
    "gender": "Paano mo masusuportahan ang equity sa classroom at group work?",
    "sexuality": "Paano mo masisiguro na safe ang spaces para sa LGBTQIA+ classmates?",
    "appearance": "Anong comments ang mas okay iwasan tungkol sa katawan o itsura?",
    "language": "Paano mo irerespeto ang iba't ibang accent at paraan ng pagsasalita?",
    "culture": "Paano mo maipapakita ang curiosity nang hindi stereotyping?",
    "social_status": "Paano mo iiwasan ang biro tungkol sa pera, work, o background?",
    "other": (
        "Paano mo kaya masusuportahan ang taong may ganitong karanasan "
        "nang hindi sila pinapahiya?"
    ),
}


@router.get("", response_model=list[StoryOut])
def list_approved_stories(db: Session = Depends(get_db)):
    return (
        db.query(Story)
        .filter(Story.status == "approved")
        .order_by(Story.created_at.desc())
        .all()
    )


@router.post("", response_model=MessageOut, status_code=201)
def submit_story(payload: StoryCreate, db: Session = Depends(get_db)):
    name = (payload.display_name or "Anonymous").strip() or "Anonymous"
    story = Story(
        body=payload.body.strip(),
        display_name=name[:80],
        category=payload.category,
        status="pending",
        reflection_prompt=CATEGORY_PROMPTS.get(payload.category, CATEGORY_PROMPTS["other"]),
    )
    db.add(story)
    db.commit()
    return {
        "message": (
            "Salamat sa pag-share. Naka-pending muna ang story mo for moderation "
            "para mas safe ang wall para sa lahat."
        )
    }


@router.post("/{story_id}/relate", response_model=StoryOut)
def relate_to_story(story_id: int, db: Session = Depends(get_db)):
    story = (
        db.query(Story)
        .filter(Story.id == story_id, Story.status == "approved")
        .first()
    )
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    story.relate_count += 1
    db.commit()
    db.refresh(story)
    return story
