import { Link } from "react-router-dom";
import { campaign } from "../campaign";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/bridge">Bridge</Link>
          <Link to="/legal">Rights</Link>
          <Link to="/resources">Support</Link>
          <Link to="/about">About</Link>
          <Link to="/kapwa">Stories</Link>
        </div>
        <div className="footer-stat">
          <span>Tolerance → Belonging</span>
          <div className="footer-stat-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>{campaign.name}</h3>
          <p>
            Student-led campus campaign for LGBTQIA+ inclusion and belonging.
          </p>
          <p className="tagline-sm">{campaign.shortTagline}</p>
        </div>
        <div>
          <h4>Features</h4>
          <ul>
            <li><Link to="/about">See the Gap</Link></li>
            <li><Link to="/learn">Quiet Harm</Link></li>
            <li><Link to="/kapwa">Stories</Link></li>
            <li><Link to="/quiz">Practice</Link></li>
            <li><Link to="/pledge">Your Mark</Link></li>
          </ul>
        </div>
        <div>
          <h4>Note</h4>
          <p>
            Educational campaign only — not a substitute for official reporting or
            legal advice.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Tolerance → Acceptance → Inclusion → Belonging</span>
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </footer>
  );
}
