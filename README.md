# Project T.U.L.A.Y.

**Transforming Understanding through Learning, Acceptance, and You**

A campus digital campaign for **Far Eastern University Institute of Technology (FEU Tech)** promoting awareness, empathy, and action against microaggressions and discrimination.

> *Hindi sapat ang tolerance. Dapat may acceptance.*

## Stack

| Layer | Tech |
|--------|------|
| Frontend | React + Vite + React Router |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Auth (admin) | JWT + shared password |

## Quick start

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: **http://127.0.0.1:5173**

API docs: **http://127.0.0.1:8000/docs**

### Admin

- URL: `/admin`
- Default password: `tulay-admin`
- Override with env: `TULAY_ADMIN_PASSWORD`, `TULAY_SECRET_KEY`

## Features

- **Home / About** — campaign intro for FEU Tech
- **Learn + H.I.N.T.O.** — microaggressions, tolerance vs acceptance
- **K.A.P.W.A.** — moderated story wall, categories, “I relate”
- **Legal** — RA 11313 awareness (educational, not legal advice)
- **Quiz** — campus scenarios with feedback
- **Pledge wall** — public commitments
- **Resources** — FEU Tech GCU/Discipline/SADU + national hotlines
- **Admin** — approve/reject pending stories

## Project layout

```
backend/app/     FastAPI app, models, routers, seed data
frontend/src/    React pages & styles
```
