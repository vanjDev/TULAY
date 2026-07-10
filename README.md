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
| Runner | `python main.py` on **port 5123** |

## Run (recommended)

One command serves **frontend + API** together:

```bash
# first time — Python deps
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cd ..

# first time — Node (for building the UI)
cd frontend
npm install
cd ..

# start everything
python main.py
```

Open: **http://127.0.0.1:5123**

### Useful flags

```bash
python main.py              # port 5123
python main.py --build      # rebuild React UI, then start
python main.py --port 5123  # explicit port
python main.py --reload     # API auto-reload while developing
```

If `frontend/dist` is missing, `main.py` will run `npm run build` automatically.

### Admin

- URL: http://127.0.0.1:5123/admin  
- Default password: `tulay-admin`  
- Env overrides: `TULAY_ADMIN_PASSWORD`, `TULAY_SECRET_KEY`

## Dev mode (optional split)

```bash
# API
cd backend
.venv\Scripts\uvicorn app.main:app --reload --port 8000

# UI (proxies /api → 8000)
cd frontend
npm run dev
```

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
main.py              # ← python main.py  (port 5123)
backend/app/         # FastAPI + SQLite
frontend/src/        # React pages
frontend/public/art/ # Imagine illustrations
frontend/dist/       # production build (served by Python)
```
