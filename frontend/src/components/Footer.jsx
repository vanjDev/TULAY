import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Project T.U.L.A.Y.</h3>
          <p>
            Transforming Understanding through Learning, Acceptance, and You —
            a campus digital campaign for FEU Institute of Technology.
          </p>
          <p className="tagline-sm">
            Hindi sapat ang tolerance. Dapat may acceptance.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/kapwa">K.A.P.W.A. Stories</Link></li>
            <li><Link to="/hinto">H.I.N.T.O. Hub</Link></li>
            <li><Link to="/quiz">Scenario Quiz</Link></li>
            <li><Link to="/pledge">Pledge Wall</Link></li>
            <li><Link to="/resources">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4>Campus</h4>
          <p>Far Eastern University Institute of Technology (FEU Tech)</p>
          <p>
            <a href="https://www.feutech.edu.ph/" target="_blank" rel="noreferrer">
              feutech.edu.ph
            </a>
          </p>
          <p className="muted">
            This site is an educational student campaign platform. Not a substitute
            for official reporting channels or legal advice.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Built for awareness, empathy, and action.</span>
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </footer>
  );
}
