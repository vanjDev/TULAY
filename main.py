#!/usr/bin/env python3
"""
Project T.U.L.A.Y. — single-command runner.

Usage:
    python main.py
    python main.py --build      # force rebuild frontend first
    python main.py --port 5123  # default is 5123

Then open: http://127.0.0.1:5123
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"
DIST = FRONTEND / "dist"
DEFAULT_PORT = 5123


def _which(cmd: str) -> str | None:
    return shutil.which(cmd)


def _run(cmd: list[str], cwd: Path) -> None:
    print(f"\n→ {' '.join(cmd)}  (in {cwd})")
    subprocess.run(cmd, cwd=str(cwd), check=True)


def ensure_frontend(force_build: bool = False) -> None:
    index = DIST / "index.html"
    if index.is_file() and not force_build:
        print(f"Using existing frontend build: {DIST}")
        return

    npm = _which("npm")
    if not npm:
        if index.is_file():
            print("npm not found; using existing frontend/dist")
            return
        print(
            "ERROR: frontend/dist is missing and npm is not installed.\n"
            "Install Node.js, then run:  python main.py --build",
            file=sys.stderr,
        )
        sys.exit(1)

    print("Building React frontend…")
    if not (FRONTEND / "node_modules").is_dir():
        _run([npm, "install"], FRONTEND)
    _run([npm, "run", "build"], FRONTEND)

    if not index.is_file():
        print("ERROR: frontend build failed — index.html not found.", file=sys.stderr)
        sys.exit(1)
    print("Frontend build ready.")


def ensure_python_deps() -> None:
    """Best-effort: use backend venv uvicorn if present."""
    pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Run Project T.U.L.A.Y. on one port")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("PORT", DEFAULT_PORT)),
        help=f"HTTP port (default {DEFAULT_PORT})",
    )
    parser.add_argument(
        "--host",
        default=os.environ.get("HOST", "127.0.0.1"),
        help="Bind host (default 127.0.0.1)",
    )
    parser.add_argument(
        "--build",
        action="store_true",
        help="Force rebuild the React frontend before starting",
    )
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload (dev; API only, not frontend)",
    )
    args = parser.parse_args()

    ensure_frontend(force_build=args.build)

    # Import app from backend package
    sys.path.insert(0, str(BACKEND))
    try:
        import uvicorn
    except ImportError:
        print(
            "ERROR: uvicorn not installed.\n"
            "  cd backend\n"
            "  python -m venv .venv\n"
            "  .venv\\Scripts\\activate   # Windows\n"
            "  pip install -r requirements.txt",
            file=sys.stderr,
        )
        sys.exit(1)

    # Prefer backend venv packages if we're on system python without deps
    venv_site = BACKEND / ".venv"
    if venv_site.is_dir():
        # Re-exec with venv python if current interpreter lacks app deps
        try:
            import fastapi  # noqa: F401
        except ImportError:
            if sys.platform == "win32":
                venv_python = venv_site / "Scripts" / "python.exe"
            else:
                venv_python = venv_site / "bin" / "python"
            if venv_python.is_file():
                print(f"Re-launching with {venv_python} …")
                os.execv(
                    str(venv_python),
                    [str(venv_python), str(ROOT / "main.py"), *sys.argv[1:]],
                )

    print("\n" + "=" * 52)
    print("  Project T.U.L.A.Y.  ·  FEU Tech")
    print(f"  Open →  http://{args.host}:{args.port}")
    print(f"  API  →  http://{args.host}:{args.port}/api/health")
    print(f"  Docs →  http://{args.host}:{args.port}/docs")
    print("=" * 52 + "\n")

    uvicorn.run(
        "app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        app_dir=str(BACKEND),
    )


if __name__ == "__main__":
    main()
