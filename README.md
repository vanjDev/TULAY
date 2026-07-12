# Project T.U.L.A.Y.

**Transforming Understanding through Learning, Acceptance, and You**

A campus campaign bridging the gap between tolerance and true inclusion.

> *Bridge to Belonging — Building Connections Beyond Labels*

## Core idea

Legal protection does not automatically mean lived inclusion. We examine:

**Tolerance → Acceptance → Inclusion → Belonging**

Microaggressions (jokes, “preferences,” everyday exclusion) keep many LGBTQIA+ students stuck between tolerance and acceptance. T.U.L.A.Y. surfaces that gap and creates structured spaces — online and on campus — for genuine connection.

## Features 1–5 (core journey)

| # | Feature | Focus |
|---|---------|--------|
| 1 | **See the Gap** (Tolerance ≠ Inclusion) | Name the problem |
| 2 | **Name the Quiet Harm** (Microaggressions) | Everyday exclusion |
| 3 | **Hear Each Other** (Stories & Bridge Circles) | Connection |
| 4 | **Practice Belonging** (Guided reflection) | Scenarios & prompts |
| 5 | **Leave Your Mark** (Commitment & belonging) | Physical planks + digital pledge |

**Bridge to Belonging** is the flagship live activity under Features 3–5 (register → interest circles → ground rules → reflection themes → planks → closing). See `/bridge` on the site.

## Website tools

- **Home / About** — campaign story & Features 1–5  
- **Bridge** — live activity flow  
- **Learn + H.I.N.T.O.** — microaggressions & the progression  
- **K.A.P.W.A.** — moderated story wall  
- **Quiz** — campus scenarios  
- **Pledge** — digital commitment planks  
- **Legal / Resources** — rights awareness & support  
- **Admin** — approve/reject pending stories  

## Stack

| Layer | Tech |
|--------|------|
| Frontend | React + Vite + React Router |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Auth | Participant JWT + admin JWT |
| Runner | `python main.py` on **port 5123** |

## Run (recommended)

One command serves **frontend + API** together:

```bash
# first time — Python deps (from repo root)
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux
pip install -r requirements.txt

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
python main.py              # port 5123; auto-rebuilds UI if source changed
python main.py --build      # force rebuild React UI, then start
python main.py --no-build   # skip rebuild (faster; uses existing dist)
python main.py --port 5123  # explicit port
python main.py --reload     # API auto-reload while developing
```

### Admin

- URL: http://127.0.0.1:5123/admin  
- Default password: `tulay-admin`  
- Env overrides: `TULAY_ADMIN_PASSWORD`, `TULAY_SECRET_KEY`

### Participant auth

- Email/password auth remains available on `/login` and `/register`
- Google Sign-In is also available on those pages when `GOOGLE_CLIENT_ID` is configured
- The backend verifies Google ID tokens server-side and then issues the app's own JWT

### Environment variables

- `TULAY_SECRET_KEY`
  Used to sign the app's JWT tokens for participant and admin auth.
- `TULAY_ADMIN_PASSWORD`
  Overrides the default admin password.
- `GOOGLE_CLIENT_ID`
  Required to enable Google Sign-In with Google Identity Services. Use the Web application client ID from Google Cloud.
- `GOOGLE_CLIENT_SECRET`
  Not used by this GIS ID-token flow, so it does not need to be set.

### Google Cloud setup

1. Create or reuse a Google Cloud OAuth 2.0 client of type `Web application`.
2. Add `http://127.0.0.1:5123` and any other local dev origin you use to `Authorized JavaScript origins`.
3. Set `GOOGLE_CLIENT_ID` in your environment before starting `python main.py`.
4. Keep using HTTPS and a production origin in deployment.

## Dev mode (optional split)

```bash
# API
cd backend
.venv\Scripts\uvicorn app.main:app --reload --port 8000

# UI (proxies /api → 8000)
cd frontend
npm run dev
```

## Project layout

```
main.py              # ← python main.py  (port 5123)
backend/app/         # FastAPI + SQLite
frontend/src/        # React pages + campaign.js (Features 1–5)
frontend/public/art/ # campaign illustrations
frontend/dist/       # production build (served by Python)
requirements.txt     # Python dependencies
```
