from pathlib import Path

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker

BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_URL = f"sqlite:///{BASE_DIR / 'tulay.db'}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def run_migrations() -> None:
    """Apply lightweight SQLite schema updates for local development."""
    inspector = inspect(engine)

    if "participants" not in inspector.get_table_names():
        return

    columns = {column["name"] for column in inspector.get_columns("participants")}
    statements: list[str] = []

    if "google_sub" not in columns:
        statements.append("ALTER TABLE participants ADD COLUMN google_sub VARCHAR(255)")
    if "email_verified" not in columns:
        statements.append(
            "ALTER TABLE participants ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT 0"
        )
    if "profile_picture_url" not in columns:
        statements.append("ALTER TABLE participants ADD COLUMN profile_picture_url VARCHAR(500)")

    with engine.begin() as conn:
        for statement in statements:
            conn.execute(text(statement))
        conn.execute(
            text(
                "CREATE UNIQUE INDEX IF NOT EXISTS ix_participants_google_sub "
                "ON participants (google_sub)"
            )
        )
