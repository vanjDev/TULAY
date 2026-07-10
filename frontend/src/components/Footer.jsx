import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/legal">Rights &amp; policies</Link>
          <Link to="/resources">Get support</Link>
          <Link to="/about">About TULAY</Link>
          <Link to="/kapwa">Share a story</Link>
        </div>
        <div className="footer-stat">
          <span>Built for students choosing acceptance every day</span>
          <div className="footer-stat-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Project T.U.L.A.Y.</h3>
          <p>
            Transforming Understanding through Learning, Acceptance, and You — a
            student-led campaign for gender equality, LGBTQIA+ inclusion, and safer
            campus spaces.
          </p>
          <p className="tagline-sm">
            Hindi sapat ang tolerance. Dapat may acceptance.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/learn">Learn microaggressions</Link></li>
            <li><Link to="/hinto">H.I.N.T.O. hub</Link></li>
            <li><Link to="/quiz">Scenario quiz</Link></li>
            <li><Link to="/pledge">Pledge wall</Link></li>
          </ul>
        </div>
        <div>
          <h4>For students</h4>
          <p>
            Whether you&apos;re learning, unlearning, or looking for support —
            this space is for you.
          </p>
          <p className="muted" style={{ color: "rgba(247,241,230,0.55)" }}>
            Educational campaign only. Not a substitute for official reporting
            channels or legal advice.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Awareness · Empathy · Action · Acceptance</span>
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </footer>
  );
}
