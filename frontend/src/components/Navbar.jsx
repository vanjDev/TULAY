import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const primary = [
  { to: "/about", label: "About" },
  { to: "/bridge", label: "Bridge" },
  { to: "/learn", label: "Learn" },
  { to: "/hinto", label: "HINTO" },
  { to: "/kapwa", label: "Stories" },
  { to: "/quiz", label: "Quiz" },
  { to: "/legal", label: "Rights" },
  { to: "/resources", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 22C8 12 12 8 16 8C20 8 24 12 28 22"
                stroke="#0D3B2E"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M8 22C11 16 13.5 13 16 13C18.5 13 21 16 24 22"
                stroke="#0D3B2E"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.55"
              />
              <circle cx="16" cy="20" r="2.2" fill="#0D3B2E" />
            </svg>
          </span>
          <span className="brand-text">
            <strong>
              Project <span>TULAY</span>
            </strong>
            <small>Bridge to Belonging</small>
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger ${open ? "open" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {primary.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/pledge" className="nav-cta">
            Leave a Plank
          </NavLink>
        </nav>
      </div>
      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
