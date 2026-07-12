from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .env import load_env_file

load_env_file()

from .database import Base, SessionLocal, engine, run_migrations
from .routers import admin, participants, pledges, quiz, stories
from .seed import seed_if_empty

Base.metadata.create_all(bind=engine)
run_migrations()

# frontend/dist — built React app (served by python main.py)
FRONTEND_DIST = Path(__file__).resolve().parents[2] / "frontend" / "dist"

app = FastAPI(
    title="Project T.U.L.A.Y. API",
    description="Transforming Understanding through Learning, Acceptance, and You — for students",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stories.router)
app.include_router(pledges.router)
app.include_router(quiz.router)
app.include_router(admin.router)
app.include_router(participants.router)


@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "campaign": "Project T.U.L.A.Y.",
        "audience": "students",
        "frontend_built": FRONTEND_DIST.joinpath("index.html").is_file(),
    }


def _mount_frontend() -> None:
    """Serve the Vite production build + SPA fallback."""
    if not FRONTEND_DIST.joinpath("index.html").is_file():
        return

    assets_dir = FRONTEND_DIST / "assets"
    if assets_dir.is_dir():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    art_dir = FRONTEND_DIST / "art"
    if art_dir.is_dir():
        app.mount("/art", StaticFiles(directory=str(art_dir)), name="art")

    @app.get("/")
    def serve_index():
        return FileResponse(FRONTEND_DIST / "index.html")

    @app.get("/{full_path:path}")
    def spa_fallback(full_path: str):
        # Never swallow API routes (should already be matched, but be safe)
        if full_path.startswith("api") or full_path in {"docs", "openapi.json", "redoc"}:
            raise HTTPException(status_code=404, detail="Not found")

        candidate = FRONTEND_DIST / full_path
        if candidate.is_file():
            return FileResponse(candidate)

        # Client-side routes: /about, /kapwa, /admin, etc.
        return FileResponse(FRONTEND_DIST / "index.html")


_mount_frontend()
