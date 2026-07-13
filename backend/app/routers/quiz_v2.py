from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import QuizV2
from ..schemas import QuizV2Answer, QuizV2Item, QuizV2Outcome

router = APIRouter(prefix="/api/quizv2", tags=["quizv2"])


@router.get("/questionset/", response_model=list[QuizV2Item])
def get_questionset(db: Session = Depends(get_db)):
    questions = db.query(QuizV2).all()
    return [
        QuizV2Item(
            id=question.id,
            question=question.question,
            choices={
                "q1": question.choices.q1,
                "q2": question.choices.q2,
                "q3": question.choices.q3,
                "q4": question.choices.q4,
            },
        )
        for question in questions
    ]


@router.post("/answer/", response_model=QuizV2Outcome)
def submit_answer(payload: QuizV2Answer, db: Session = Depends(get_db)):
    if payload.answer not in {1, 2, 3, 4}:
        raise HTTPException(status_code=400, detail="Answer must be 1, 2, 3, or 4")

    question = db.query(QuizV2).filter(QuizV2.id == payload.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    data = question.data
    if payload.answer == 1:
        data.q1 += 1
    elif payload.answer == 2:
        data.q2 += 1
    elif payload.answer == 3:
        data.q3 += 1
    else:
        data.q4 += 1

    db.commit()

    opinion_map = {
        1: question.responses.q1,
        2: question.responses.q2,
        3: question.responses.q3,
        4: question.responses.q4,
    }

    return QuizV2Outcome(
        opinion=opinion_map[payload.answer],
        data={
            "q1": data.q1,
            "q2": data.q2,
            "q3": data.q3,
            "q4": data.q4,
        },
    )
