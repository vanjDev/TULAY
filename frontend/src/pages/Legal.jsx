import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div className="page narrow">
      <header className="page-header">
        <span className="pill">Legal rights</span>
        <h1>Know your rights</h1>
        <p className="lead">
          Educational overview — not legal advice. When in doubt, ask a trusted office
          or counsel.
        </p>
      </header>

      <section className="panel prose">
        <h2>Safe Spaces Act (RA 11313) — “Bawal Bastos Law”</h2>
        <p>
          Republic Act No. 11313 covers <strong>gender-based sexual harassment</strong>{" "}
          in public spaces, online spaces, workplaces, and educational or training
          institutions.
        </p>
        <p>
          The law’s definition of related harassment can include{" "}
          <strong>misogynistic, transphobic, homophobic, and sexist slurs</strong>{" "}
          (including forms of catcalling). Educational institutions also have roles in
          prevention — such as information campaigns and anti-sexual harassment
          measures.
        </p>
      </section>

      <section className="panel panel-alt prose">
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

      <section className="grid-2">
        <div className="panel">
          <h3>What this campaign asks of us</h3>
          <ul className="check-list">
            <li>Don’t normalize identity-based insults as “biro lang”</li>
            <li>Support peers who experience harassment</li>
            <li>Use campus and official channels when needed</li>
            <li>Keep learning — laws evolve; respect is daily practice</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Where to go next</h3>
          <ul className="nice-list">
            <li>
              <Link to="/resources">FEU Tech + national resources</Link>
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
              <a href="https://www.feutech.edu.ph/contact" target="_blank" rel="noreferrer">
                FEU Tech contact directory
              </a>
            </li>
          </ul>
        </div>
      </section>

      <p className="muted disclaimer">
        Disclaimer: This page is for student awareness only. It does not create an
        attorney-client relationship and may not cover every legal nuance. For
        complaints or emergencies, contact appropriate authorities and campus offices.
      </p>
    </div>
  );
}
