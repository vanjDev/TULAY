from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import (
    GOOGLE_CLIENT_ID,
    create_participant_token,
    google_sign_in_enabled,
    hash_user_password,
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
    ParticipantRegister,
)

router = APIRouter(prefix="/api/participants", tags=["participants"])
GOOGLE_ONLY_PASSWORD_SENTINEL = "!google-auth-only!"


def _participant_response(participant: Participant) -> ParticipantAuthOut:
    token = create_participant_token(participant.id, participant.email)
    return ParticipantAuthOut(
        access_token=token,
        participant=ParticipantOut.model_validate(participant),
    )


@router.get("/auth-config", response_model=AuthConfigOut)
def participant_auth_config():
    return AuthConfigOut(
        google_client_id=GOOGLE_CLIENT_ID or None,
        google_enabled=google_sign_in_enabled(),
    )


@router.post("/register", response_model=ParticipantAuthOut, status_code=status.HTTP_201_CREATED)
def register_participant(payload: ParticipantRegister, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    existing = db.query(Participant).filter(Participant.email == email).first()
    if existing:
        raise HTTPException(status_code=409, detail="An account with that email already exists")

    participant = Participant(
        full_name=payload.full_name.strip(),
        email=email,
        password_hash=hash_user_password(payload.password),
        basic_info=(payload.basic_info or "").strip() or None,
        interest_1=payload.interest_1.strip(),
        interest_2=payload.interest_2.strip(),
        interest_3=payload.interest_3.strip(),
        gender_identity=(payload.gender_identity or "").strip() or None,
        sexual_orientation=(payload.sexual_orientation or "").strip() or None,
        motivation=payload.motivation.strip(),
    )
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return _participant_response(participant)


@router.post("/login", response_model=ParticipantAuthOut)
def login_participant(payload: ParticipantLogin, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    participant = db.query(Participant).filter(Participant.email == email).first()
    if participant is None or not verify_user_password(payload.password, participant.password_hash):
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
        # First-time Google sign-in creates a local participant record without requesting
        # any Google password. Interest and motivation fields can be completed later.
        participant = Participant(
            full_name=full_name,
            email=email,
            password_hash=GOOGLE_ONLY_PASSWORD_SENTINEL,
            google_sub=google_sub,
            email_verified=email_verified,
            profile_picture_url=picture,
            basic_info=None,
            interest_1="",
            interest_2="",
            interest_3="",
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
        if full_name:
            participant.full_name = full_name

    db.commit()
    db.refresh(participant)
    return _participant_response(participant)
