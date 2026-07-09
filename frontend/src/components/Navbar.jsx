import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/learn", label: "Learn" },
  { to: "/hinto", label: "HINTO" },
  { to: "/kapwa", label: "KAPWA" },
  { to: "/legal", label: "Rights" },
  { to: "/quiz", label: "Quiz" },
  { to: "/pledge", label: "Pledge" },
  { to: "/resources", label: "Resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-badge">T</span>
          <div>
            <strong>Project T.U.L.A.Y.</strong>
            <small>FEU Tech · Inclusion Campaign</small>
          </div>
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
