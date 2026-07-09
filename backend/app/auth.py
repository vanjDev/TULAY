import os
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

SECRET_KEY = os.getenv("TULAY_SECRET_KEY", "tulay-dev-secret-change-me")
ADMIN_PASSWORD = os.getenv("TULAY_ADMIN_PASSWORD", "tulay-admin")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 12

security = HTTPBearer(auto_error=False)


def create_admin_token() -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": "admin", "exp": expire, "role": "admin"}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(password: str) -> bool:
    return password == ADMIN_PASSWORD


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
