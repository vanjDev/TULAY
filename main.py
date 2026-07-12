#!/usr/bin/env python3
"""
Project T.U.L.A.Y. - single-command runner.

Usage:
    python main.py
    python main.py --build      # force rebuild frontend
    python main.py --no-build   # skip rebuild even if source changed
    python main.py --port 5123  # default is 5123

By default, main.py rebuilds the React app when frontend source is newer
than frontend/dist (so restart picks up UI changes).

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

sys.path.insert(0, str(BACKEND))
from app.env import load_env_file

load_env_file(ROOT / ".env")

# Watched paths: if any are newer than dist/index.html, rebuild
SOURCE_GLOBS = (
    "src/**/*",
    "public/**/*",
    "index.html",
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "vite.config.ts",
)


def _which(cmd: str) -> str | None:
    return shutil.which(cmd)


def _run(cmd: list[str], cwd: Path) -> None:
    print(f"\n> {' '.join(cmd)}  (in {cwd})")
    subprocess.run(cmd, cwd=str(cwd), check=True)


def _latest_mtime(paths: list[Path]) -> float:
    latest = 0.0
    for path in paths:
        try:
            if path.is_file():
                latest = max(latest, path.stat().st_mtime)
        except OSError:
            continue
    return latest


def _collect_source_files() -> list[Path]:
    files: list[Path] = []
    for pattern in SOURCE_GLOBS:
        files.extend(p for p in FRONTEND.glob(pattern) if p.is_file())
    # de-dupe
    return list({p.resolve() for p in files})


def frontend_needs_rebuild() -> tuple[bool, str]:
    index = DIST / "index.html"
    if not index.is_file():
        return True, "frontend/dist is missing"

    dist_mtime = index.stat().st_mtime
    sources = _collect_source_files()
    if not sources:
        return False, "no frontend sources found (using existing dist)"

    src_mtime = _latest_mtime(sources)
    if src_mtime > dist_mtime + 0.5:  # small tolerance for FS precision
        return True, "frontend source is newer than dist"

    return False, "dist is up to date"


def build_frontend() -> None:
    npm = _which("npm")
    index = DIST / "index.html"

    if not npm:
        if index.is_file():
            print("WARNING: npm not found; cannot rebuild. Using existing frontend/dist")
            return
        print(
            "ERROR: frontend/dist is missing and npm is not installed.\n"
            "Install Node.js, then run:  python main.py --build",
            file=sys.stderr,
        )
        sys.exit(1)

    print("Building React frontend...")
    if not (FRONTEND / "node_modules").is_dir():
        _run([npm, "install"], FRONTEND)
    _run([npm, "run", "build"], FRONTEND)

    if not index.is_file():
        print("ERROR: frontend build failed - index.html not found.", file=sys.stderr)
        sys.exit(1)
    print("Frontend build ready.")


def ensure_frontend(*, force_build: bool = False, skip_build: bool = False) -> None:
    index = DIST / "index.html"

    if skip_build:
        if not index.is_file():
            print(
                "ERROR: --no-build used but frontend/dist is missing.\n"
                "Run once without --no-build (or with --build).",
                file=sys.stderr,
            )
            sys.exit(1)
        print(f"Skipping frontend build (--no-build). Using {DIST}")
        return

    if force_build:
        print("Force rebuild requested (--build).")
        build_frontend()
        return

    needs, reason = frontend_needs_rebuild()
    if needs:
        print(f"Frontend rebuild needed: {reason}")
        build_frontend()
    else:
        print(f"Using existing frontend build ({reason}): {DIST}")


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
        "--no-build",
        action="store_true",
        help="Skip frontend rebuild even if source files changed",
    )
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload (dev; API only, not frontend)",
    )
    args = parser.parse_args()

    if args.build and args.no_build:
        print("ERROR: use only one of --build or --no-build", file=sys.stderr)
        sys.exit(1)

    ensure_frontend(force_build=args.build, skip_build=args.no_build)

    # Import app from backend package
    try:
        import uvicorn
    except ImportError:
        print(
            "ERROR: uvicorn not installed.\n"
            "  python -m venv .venv\n"
            "  .venv\\Scripts\\activate   # Windows\n"
            "  pip install -r requirements.txt",
            file=sys.stderr,
        )
        sys.exit(1)

    # Prefer backend venv packages if we're on system python without deps
    venv_site = BACKEND / ".venv"
    if venv_site.is_dir():
        try:
            import fastapi  # noqa: F401
        except ImportError:
            if sys.platform == "win32":
                venv_python = venv_site / "Scripts" / "python.exe"
            else:
                venv_python = venv_site / "bin" / "python"
            if venv_python.is_file():
                print(f"Re-launching with {venv_python}...")
                os.execv(
                    str(venv_python),
                    [str(venv_python), str(ROOT / "main.py"), *sys.argv[1:]],
                )

    print("\n" + "=" * 52)
    print("  Project T.U.L.A.Y.  -  For students")
    print(f"  Open ->  http://{args.host}:{args.port}")
    print(f"  API  ->  http://{args.host}:{args.port}/api/health")
    print(f"  Docs ->  http://{args.host}:{args.port}/docs")
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
