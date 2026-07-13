from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


StoryCategory = Literal[
    "gender",
    "sexuality",
    "appearance",
    "language",
    "culture",
    "social_status",
    "other",
]


class StoryCreate(BaseModel):
    body: str = Field(min_length=10, max_length=3000)
    display_name: str | None = Field(default="Anonymous", max_length=80)
    category: StoryCategory = "other"


class StoryOut(BaseModel):
    id: int
    body: str
    display_name: str
    category: str
    relate_count: int
    reflection_prompt: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class StoryAdminOut(StoryOut):
    status: str


class PledgeCreate(BaseModel):
    message: str | None = Field(default=None, max_length=500)


class PledgeOut(BaseModel):
    id: int
    display_name: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}


class QuizOptionPublic(BaseModel):
    id: int
    situation: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    order_index: int

    model_config = {"from_attributes": True}


class QuizAnswer(BaseModel):
    scenario_id: int
    selected: Literal["a", "b", "c", "d"]


class QuizFeedback(BaseModel):
    correct: bool
    correct_option: str
    explanation: str
    selected: str


class AdminLogin(BaseModel):
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MessageOut(BaseModel):
    message: str


class StatsOut(BaseModel):
    pending_stories: int
    approved_stories: int
    rejected_stories: int
    pledges: int
    quiz_scenarios: int


class ParticipantRegister(BaseModel):
    """Basic account only — Bridge profile is completed in a second step."""

    full_name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=128)


class ParticipantLogin(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=8, max_length=128)


class GoogleAuthIn(BaseModel):
    credential: str = Field(min_length=20)


class AuthConfigOut(BaseModel):
    google_client_id: str | None
    google_enabled: bool


class ParticipantProfileUpdate(BaseModel):
    """Bridge Circle profile fields (same form as Join the Bridge)."""

    full_name: str = Field(min_length=2, max_length=120)
    course: str = Field(min_length=2, max_length=40)
    age: int = Field(ge=1, le=120)
    interest_1: str = Field(min_length=1, max_length=80)
    interest_2: str = Field(min_length=1, max_length=80)
    interest_3: str = Field(min_length=1, max_length=80)
    other_interest: str | None = Field(default=None, max_length=120)
    main_interest: str = Field(min_length=1, max_length=80)
    gender_identity: str | None = Field(default=None, max_length=120)
    sexual_orientation: str | None = Field(default=None, max_length=120)
    motivation: str = Field(min_length=2, max_length=1500)


class ParticipantSettingsUpdate(BaseModel):
    username: str | None = Field(default=None, min_length=3, max_length=40)
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    current_password: str | None = Field(default=None, max_length=128)
    new_password: str | None = Field(default=None, min_length=8, max_length=128)


class ParticipantOut(BaseModel):
    id: int
    full_name: str
    username: str | None = None
    email: str
    email_verified: bool
    profile_picture_url: str | None
    course: str | None = None
    age: int | None = None
    basic_info: str | None
    interest_1: str
    interest_2: str
    interest_3: str
    other_interest: str | None = None
    main_interest: str | None = None
    gender_identity: str | None
    sexual_orientation: str | None
    motivation: str
    profile_complete: bool = False
    has_password: bool = True
    created_at: datetime

    model_config = {"from_attributes": True}


class ParticipantAuthOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    participant: ParticipantOut
