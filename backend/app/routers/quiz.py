from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import QuizScenario
from ..schemas import QuizAnswer, QuizFeedback, QuizOptionPublic

router = APIRouter(prefix="/api/quiz", tags=["quiz"])


@router.get("/scenarios", response_model=list[QuizOptionPublic])
def list_scenarios(db: Session = Depends(get_db)):
    return (
        db.query(QuizScenario)
        .order_by(QuizScenario.order_index.asc(), QuizScenario.id.asc())
        .all()
    )


@router.post("/answer", response_model=QuizFeedback)
def answer_scenario(payload: QuizAnswer, db: Session = Depends(get_db)):
    scenario = db.query(QuizScenario).filter(QuizScenario.id == payload.scenario_id).first()
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
    selected = payload.selected.lower()
    correct = selected == scenario.correct_option.lower()
    return QuizFeedback(
        correct=correct,
        correct_option=scenario.correct_option.lower(),
        explanation=scenario.explanation,
        selected=selected,
    )
