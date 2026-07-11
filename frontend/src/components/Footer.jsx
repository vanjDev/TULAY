import { Link } from "react-router-dom";
import { campaign } from "../campaign";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/bridge">Bridge to Belonging</Link>
          <Link to="/legal">Rights &amp; policies</Link>
          <Link to="/resources">Get support</Link>
          <Link to="/about">About TULAY</Link>
          <Link to="/kapwa">Share a story</Link>
        </div>
        <div className="footer-stat">
          <span>From tolerance toward belonging — one choice at a time</span>
          <div className="footer-stat-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>{campaign.name}</h3>
          <p>
            {campaign.expansion} — a student-led campus campaign bridging the gap
            between tolerance and true inclusion for LGBTQIA+ students and every
            peer who deserves to belong.
          </p>
          <p className="tagline-sm">{campaign.tagline}</p>
        </div>
        <div>
          <h4>Features 1–5</h4>
          <ul>
            <li><Link to="/about">See the Gap</Link></li>
            <li><Link to="/learn">Name the Quiet Harm</Link></li>
            <li><Link to="/kapwa">Hear Each Other</Link></li>
            <li><Link to="/quiz">Practice Belonging</Link></li>
            <li><Link to="/pledge">Leave Your Mark</Link></li>
          </ul>
        </div>
        <div>
          <h4>For students</h4>
          <p>
            Whether you&apos;re learning, unlearning, joining a Bridge Circle, or
            looking for support — this space is for you.
          </p>
          <p className="muted" style={{ color: "rgba(247,241,230,0.55)" }}>
            Educational campaign only. Not a substitute for official reporting
            channels or legal advice.
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
