from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import (
    GOOGLE_CLIENT_ID,
    create_participant_token,
    google_sign_in_enabled,
    hash_user_password,
    require_participant_id,
    verify_google_credential,
    verify_user_password,
)
from ..database import get_db
from ..models import Participant
from ..schemas import (
    AuthConfigOut,
    GoogleAuthIn,
    ParticipantAuthOut,
    ParticipantLogin,
    ParticipantOut,
    ParticipantProfileUpdate,
    ParticipantRegister,
    ParticipantSettingsUpdate,
)

router = APIRouter(prefix="/api/participants", tags=["participants"])
GOOGLE_ONLY_PASSWORD_SENTINEL = "!google-auth-only!"


def _is_profile_complete(participant: Participant) -> bool:
    return bool(
        (participant.full_name or "").strip()
        and (participant.course or "").strip()
        and participant.age is not None
        and (participant.interest_1 or "").strip()
        and (participant.interest_2 or "").strip()
        and (participant.interest_3 or "").strip()
        and (participant.main_interest or "").strip()
        and (participant.motivation or "").strip()
        and (participant.gender_identity or "").strip()
        and (participant.sexual_orientation or "").strip()
    )


def _has_password(participant: Participant) -> bool:
    return bool(participant.password_hash) and participant.password_hash != GOOGLE_ONLY_PASSWORD_SENTINEL


def _participant_out(participant: Participant) -> ParticipantOut:
    data = ParticipantOut.model_validate(participant)
    return data.model_copy(
        update={
            "profile_complete": _is_profile_complete(participant),
            "has_password": _has_password(participant),
        }
    )


def _participant_response(participant: Participant) -> ParticipantAuthOut:
    token = create_participant_token(participant.id, participant.email)
    return ParticipantAuthOut(
        access_token=token,
        participant=_participant_out(participant),
    )


def _get_participant_or_404(db: Session, participant_id: int) -> Participant:
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if participant is None:
        raise HTTPException(status_code=404, detail="Participant not found")
    return participant


@router.get("/auth-config", response_model=AuthConfigOut)
def participant_auth_config():
    return AuthConfigOut(
        google_client_id=GOOGLE_CLIENT_ID or None,
        google_enabled=google_sign_in_enabled(),
    )


@router.post("/register", response_model=ParticipantAuthOut, status_code=status.HTTP_201_CREATED)
def register_participant(payload: ParticipantRegister, db: Session = Depends(get_db)):
    """Create a basic account. Bridge profile is completed afterwards."""
    email = payload.email.strip().lower()
    existing = db.query(Participant).filter(Participant.email == email).first()
    if existing:
        raise HTTPException(status_code=409, detail="An account with that email already exists")

    participant = Participant(
        full_name=payload.full_name.strip(),
        email=email,
        password_hash=hash_user_password(payload.password),
        basic_info=None,
        course=None,
        age=None,
        interest_1="",
        interest_2="",
        interest_3="",
        other_interest=None,
        main_interest=None,
        gender_identity=None,
        sexual_orientation=None,
        motivation="",
    )
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return _participant_response(participant)


@router.post("/login", response_model=ParticipantAuthOut)
def login_participant(payload: ParticipantLogin, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    participant = db.query(Participant).filter(Participant.email == email).first()
    if (
        participant is None
        or not _has_password(participant)
        or not verify_user_password(payload.password, participant.password_hash)
    ):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return _participant_response(participant)


@router.post("/google", response_model=ParticipantAuthOut)
def google_participant_login(payload: GoogleAuthIn, db: Session = Depends(get_db)):
    claims = verify_google_credential(payload.credential)
    google_sub = claims.get("sub")
    email = (claims.get("email") or "").strip().lower()
    email_verified = bool(claims.get("email_verified"))
    full_name = (claims.get("name") or "").strip() or "Google user"
    picture = (claims.get("picture") or "").strip() or None

    if not google_sub:
        raise HTTPException(status_code=401, detail="Google account identifier missing")
    if not email:
        raise HTTPException(status_code=401, detail="Google account email missing")

    participant = db.query(Participant).filter(Participant.google_sub == google_sub).first()
    if participant is None and email_verified:
        participant = db.query(Participant).filter(Participant.email == email).first()
        if participant and participant.google_sub and participant.google_sub != google_sub:
            raise HTTPException(
                status_code=409,
                detail="That email address is already linked to a different Google account",
            )

    if participant is None:
        # First-time Google sign-in — collect Bridge profile next.
        participant = Participant(
            full_name=full_name,
            email=email,
            password_hash=GOOGLE_ONLY_PASSWORD_SENTINEL,
            google_sub=google_sub,
            email_verified=email_verified,
            profile_picture_url=picture,
            basic_info=None,
            course=None,
            age=None,
            interest_1="",
            interest_2="",
            interest_3="",
            other_interest=None,
            main_interest=None,
            gender_identity=None,
            sexual_orientation=None,
            motivation="",
        )
        db.add(participant)
    else:
        participant.google_sub = google_sub
        participant.email = email
        participant.email_verified = email_verified
        participant.profile_picture_url = picture
        if full_name and not _is_profile_complete(participant):
            participant.full_name = full_name

    db.commit()
    db.refresh(participant)
    return _participant_response(participant)


@router.get("/me", response_model=ParticipantOut)
def get_me(
    participant_id: int = Depends(require_participant_id),
    db: Session = Depends(get_db),
):
    return _participant_out(_get_participant_or_404(db, participant_id))


@router.put("/me/profile", response_model=ParticipantAuthOut)
def update_profile(
    payload: ParticipantProfileUpdate,
    participant_id: int = Depends(require_participant_id),
    db: Session = Depends(get_db),
):
    """Save Bridge Circle profile (used by Register step 2, Bridge join, Settings)."""
    participant = _get_participant_or_404(db, participant_id)

    interests = [
        payload.interest_1.strip(),
        payload.interest_2.strip(),
        payload.interest_3.strip(),
    ]
    if len(set(interests)) != 3:
        raise HTTPException(status_code=400, detail="Please choose 3 different interests")

    main = payload.main_interest.strip()
    if main not in interests:
        raise HTTPException(
            status_code=400,
            detail="Main interest must be one of your top 3 interests",
        )

    if "Others" in interests and not (payload.other_interest or "").strip():
        raise HTTPException(status_code=400, detail="Please describe your other interest")

    participant.full_name = payload.full_name.strip()
    participant.course = payload.course.strip()
    participant.age = payload.age
    participant.interest_1 = interests[0]
    participant.interest_2 = interests[1]
    participant.interest_3 = interests[2]
    participant.other_interest = (payload.other_interest or "").strip() or None
    participant.main_interest = main
    participant.gender_identity = (payload.gender_identity or "").strip() or None
    participant.sexual_orientation = (payload.sexual_orientation or "").strip() or None
    participant.motivation = payload.motivation.strip()
    # Keep basic_info in sync for older UI surfaces
    participant.basic_info = f"{participant.course} · age {participant.age}"

    db.commit()
    db.refresh(participant)
    return _participant_response(participant)


@router.patch("/me/settings", response_model=ParticipantAuthOut)
def update_settings(
    payload: ParticipantSettingsUpdate,
    participant_id: int = Depends(require_participant_id),
    db: Session = Depends(get_db),
):
    participant = _get_participant_or_404(db, participant_id)

    if payload.full_name is not None:
        participant.full_name = payload.full_name.strip()

    if payload.username is not None:
        username = payload.username.strip().lower()
        if not username:
            participant.username = None
        else:
            if not username.replace("_", "").isalnum():
                raise HTTPException(
                    status_code=400,
                    detail="Username may only contain letters, numbers, and underscores",
                )
            clash = (
                db.query(Participant)
                .filter(Participant.username == username, Participant.id != participant.id)
                .first()
            )
            if clash:
                raise HTTPException(status_code=409, detail="That username is already taken")
            participant.username = username

    if payload.new_password:
        if _has_password(participant):
            if not payload.current_password or not verify_user_password(
                payload.current_password, participant.password_hash
            ):
                raise HTTPException(status_code=400, detail="Current password is incorrect")
        participant.password_hash = hash_user_password(payload.new_password)

    db.commit()
    db.refresh(participant)
    return _participant_response(participant)
