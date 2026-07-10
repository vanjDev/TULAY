import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Legal rights</span>
          <h1>Know your rights</h1>
          <p className="lead">
            Educational overview for students — not legal advice. When in doubt, ask
            a trusted office or counsel.
          </p>
        </header>
        <img
          src="/art/legal-scales.jpg"
          alt="Golden scales of justice with inclusive ribbon accents"
          className="page-hero-art page-hero-art-square"
        />
      </div>

      <section className="prose panel hover-lift">
        <h2>Safe Spaces Act (RA 11313) — “Bawal Bastos Law”</h2>
        <p>
          Republic Act No. 11313 covers <strong>gender-based sexual harassment</strong>{" "}
          in public spaces, online spaces, workplaces, and educational or training
          institutions.
        </p>
        <p>
          The law’s definition of related harassment can include{" "}
          <strong>misogynistic, transphobic, homophobic, and sexist slurs</strong>{" "}
          (including forms of catcalling). Schools also have roles in prevention —
          such as information campaigns and anti-sexual harassment measures.
        </p>
      </section>

      <section className="panel panel-alt prose hover-lift" style={{ marginTop: "1.1rem" }}>
        <h2>Careful framing (important)</h2>
        <p>
          <strong>Not every offensive joke automatically becomes a criminal act.</strong>{" "}
          Context, severity, repetition, targeting, and other factors matter.
        </p>
        <p>
          Still, students should understand that{" "}
          <strong>
            repeated, targeted, gender-based, sexual, sexist, homophobic, or
            transphobic harassment
          </strong>{" "}
          can have serious consequences — legally, academically, and for the people
          harmed.
        </p>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel hover-lift">
          <h3 className="panel-title">What this campaign asks of us</h3>
          <ul className="check-list">
            <li>Don’t normalize identity-based insults as “biro lang”</li>
            <li>Support peers who experience harassment</li>
            <li>Use campus and official channels when needed</li>
            <li>Keep learning — laws evolve; respect is daily practice</li>
          </ul>
        </div>
        <div className="panel hover-lift">
          <h3 className="panel-title">Where to go next</h3>
          <ul className="nice-list">
            <li>
              <Link to="/resources">Campus + national support</Link>
            </li>
            <li>
              <a
                href="https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/90094"
                target="_blank"
                rel="noreferrer"
              >
                RA 11313 (Judiciary eLibrary)
              </a>
            </li>
            <li>
              <Link to="/quiz">Practice scenarios</Link>
            </li>
          </ul>
        </div>
      </section>

      <p className="disclaimer">
        Disclaimer: This page is for student awareness only. It does not create an
        attorney-client relationship and may not cover every legal nuance. For
        complaints or emergencies, contact appropriate authorities and campus offices.
      </p>
    </div>
  );
}
