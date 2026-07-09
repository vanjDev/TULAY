from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, SessionLocal, engine
from .routers import admin, pledges, quiz, stories
from .seed import seed_if_empty

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Project T.U.L.A.Y. API",
    description="Transforming Understanding through Learning, Acceptance, and You — FEU Tech",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stories.router)
app.include_router(pledges.router)
app.include_router(quiz.router)
app.include_router(admin.router)


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
        "campus": "FEU Institute of Technology",
    }
