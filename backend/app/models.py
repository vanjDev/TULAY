from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

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
