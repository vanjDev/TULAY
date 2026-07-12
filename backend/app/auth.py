import os
from hashlib import pbkdf2_hmac
from hmac import compare_digest
from secrets import token_hex
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from jose import JWTError, jwt

SECRET_KEY = os.getenv("TULAY_SECRET_KEY", "tulay-dev-secret-change-me")
ADMIN_PASSWORD = os.getenv("TULAY_ADMIN_PASSWORD", "tulay-admin")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "").strip()
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 12
PARTICIPANT_TOKEN_EXPIRE_HOURS = 24 * 14

security = HTTPBearer(auto_error=False)


def create_admin_token() -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": "admin", "exp": expire, "role": "admin"}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(password: str) -> bool:
    return password == ADMIN_PASSWORD


def hash_user_password(password: str) -> str:
    salt = token_hex(16)
    digest = pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 200_000)
    return f"{salt}${digest.hex()}"


def verify_user_password(password: str, password_hash: str) -> bool:
    try:
        salt, expected = password_hash.split("$", 1)
    except ValueError:
        return False
    digest = pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 200_000).hex()
    return compare_digest(digest, expected)


def create_participant_token(participant_id: int, email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=PARTICIPANT_TOKEN_EXPIRE_HOURS)
    payload = {"sub": str(participant_id), "email": email, "exp": expire, "role": "participant"}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def google_sign_in_enabled() -> bool:
    return bool(GOOGLE_CLIENT_ID)


def verify_google_credential(credential: str) -> dict:
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=503, detail="Google Sign-In is not configured")

    try:
        # Google recommends verifying the ID token on the server using a client library.
        payload = google_id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid Google credential") from exc

    issuer = payload.get("iss")
    if issuer not in {"accounts.google.com", "https://accounts.google.com"}:
        raise HTTPException(status_code=401, detail="Invalid Google token issuer")

    return payload


def require_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> str:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication required",
        )
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
        return payload.get("sub", "admin")
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc
