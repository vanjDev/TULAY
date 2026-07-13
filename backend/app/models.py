from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def utcnow():
    return datetime.now(timezone.utc)


class Story(Base):
    __tablename__ = "stories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    display_name: Mapped[str] = mapped_column(String(80), default="Anonymous")
    category: Mapped[str] = mapped_column(String(40), default="other")
    status: Mapped[str] = mapped_column(String(20), default="pending", index=True)
    relate_count: Mapped[int] = mapped_column(Integer, default=0)
    reflection_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)


class Pledge(Base):
    __tablename__ = "pledges"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    display_name: Mapped[str] = mapped_column(String(80), default="Anonymous")
    message: Mapped[str] = mapped_column(Text, nullable=False)
    is_visible: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)


class QuizScenario(Base):
    __tablename__ = "quiz_scenarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    situation: Mapped[str] = mapped_column(Text, nullable=False)
    option_a: Mapped[str] = mapped_column(String(300), nullable=False)
    option_b: Mapped[str] = mapped_column(String(300), nullable=False)
    option_c: Mapped[str] = mapped_column(String(300), nullable=False)
    option_d: Mapped[str] = mapped_column(String(300), nullable=False)
    correct_option: Mapped[str] = mapped_column(String(1), nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0)


class Participant(Base):
    __tablename__ = "participants"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    username: Mapped[str | None] = mapped_column(String(40), unique=True, index=True, nullable=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    google_sub: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    profile_picture_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    # Bridge Circle profile fields
    course: Mapped[str | None] = mapped_column(String(40), nullable=True)
    age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    basic_info: Mapped[str | None] = mapped_column(Text, nullable=True)
    interest_1: Mapped[str] = mapped_column(String(80), default="", nullable=False)
    interest_2: Mapped[str] = mapped_column(String(80), default="", nullable=False)
    interest_3: Mapped[str] = mapped_column(String(80), default="", nullable=False)
    other_interest: Mapped[str | None] = mapped_column(String(120), nullable=True)
    main_interest: Mapped[str | None] = mapped_column(String(80), nullable=True)
    gender_identity: Mapped[str | None] = mapped_column(String(120), nullable=True)
    sexual_orientation: Mapped[str | None] = mapped_column(String(120), nullable=True)
    motivation: Mapped[str] = mapped_column(Text, default="", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)


class QuizV2Choices(Base):
    __tablename__ = "quiz_v2_choices"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    q1: Mapped[str] = mapped_column(Text, nullable=False)
    q2: Mapped[str] = mapped_column(Text, nullable=False)
    q3: Mapped[str] = mapped_column(Text, nullable=False)
    q4: Mapped[str] = mapped_column(Text, nullable=False)


class QuizV2Data(Base):
    __tablename__ = "quiz_v2_data"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    q1: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    q2: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    q3: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    q4: Mapped[int] = mapped_column(Integer, nullable=False, default=0)


class QuizV2Responses(Base):
    __tablename__ = "quiz_v2_responses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    q1: Mapped[str] = mapped_column(Text, nullable=False)
    q2: Mapped[str] = mapped_column(Text, nullable=False)
    q3: Mapped[str] = mapped_column(Text, nullable=False)
    q4: Mapped[str] = mapped_column(Text, nullable=False)


class QuizV2(Base):
    __tablename__ = "quiz_v2"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    choices_id: Mapped[int] = mapped_column("choices", ForeignKey("quiz_v2_choices.id"))
    responses_id: Mapped[int] = mapped_column("responses", ForeignKey("quiz_v2_responses.id"))
    data_id: Mapped[int] = mapped_column("data", ForeignKey("quiz_v2_data.id"))
    choices: Mapped[QuizV2Choices] = relationship("QuizV2Choices", lazy="joined")
    responses: Mapped[QuizV2Responses] = relationship("QuizV2Responses", lazy="joined")
    data: Mapped[QuizV2Data] = relationship("QuizV2Data", lazy="joined")
