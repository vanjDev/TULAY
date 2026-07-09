export default function Resources() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Campus map &amp; support</span>
          <h1>Support &amp; contacts</h1>
          <p className="lead">
            FEU Tech campus offices and national helplines. Verify details if you need
            immediate help.
          </p>
        </header>
        <img
          src="/art/resources-support.jpg"
          alt="Warm campus doorway symbolizing guidance and student support"
          className="page-hero-art"
        />
      </div>

      <section className="panel">
        <h2 style={{ fontFamily: "var(--display)", fontSize: "1.7rem", color: "var(--forest)" }}>
          FEU Institute of Technology
        </h2>
        <p className="muted">
          Source:{" "}
          <a href="https://www.feutech.edu.ph/contact" target="_blank" rel="noreferrer">
            feutech.edu.ph/contact
          </a>{" "}
          · Trunkline (02) 8281 8888
        </p>
        <div className="resource-list">
          <div>
            <strong>Guidance and Counseling Unit (GCU)</strong>
            <p>gcu@feutech.edu.ph · Local 122</p>
          </div>
          <div>
            <strong>Discipline Unit</strong>
            <p>disciplineunit@feutech.edu.ph · Local 124</p>
          </div>
          <div>
            <strong>Student Activities (SADU)</strong>
            <p>sadu@feutech.edu.ph · Local 128</p>
          </div>
          <div>
            <strong>iCare – ERC</strong>
            <p>icare@feutech.edu.ph</p>
          </div>
          <div>
            <strong>General info</strong>
            <p>
              <a href="https://www.feutech.edu.ph/" target="_blank" rel="noreferrer">
                www.feutech.edu.ph
              </a>{" "}
              · info@feutech.edu.ph
            </p>
          </div>
        </div>
        <p className="muted" style={{ marginTop: "1rem" }}>
          For formal gender-based harassment complaints, ask campus offices about the
          proper committee/process under RA 11313 / school policy.
        </p>
      </section>

      <section className="panel panel-alt" style={{ marginTop: "1.1rem" }}>
        <h2>National / emergency support</h2>
        <div className="resource-list">
          <div style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <strong style={{ color: "var(--cream)" }}>Emergency</strong>
            <p style={{ color: "rgba(247,241,230,0.75)" }}>911</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <strong style={{ color: "var(--cream)" }}>NCMH Crisis Hotline</strong>
            <p style={{ color: "rgba(247,241,230,0.75)" }}>
              1553 (Luzon-wide landline) · 0917-899-8727 · 0908-639-2672
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <strong style={{ color: "var(--cream)" }}>
              PNP Women and Children Protection / Aling Pulis
            </strong>
            <p style={{ color: "rgba(247,241,230,0.75)" }}>
              0919-777-7377 · published WCPC landlines via official channels
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <strong style={{ color: "var(--cream)" }}>NBI Anti-VAWC Division</strong>
            <p style={{ color: "rgba(247,241,230,0.75)" }}>(02) 8525-6028 (public listings)</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
            <strong style={{ color: "var(--cream)" }}>Public Attorney’s Office</strong>
            <p style={{ color: "rgba(247,241,230,0.75)" }}>
              (02) 8929-9436 (locals per PAO guidance)
            </p>
          </div>
        </div>
      </section>

      <section className="panel prose" style={{ marginTop: "1.1rem" }}>
        <h2>Laws &amp; reading</h2>
        <ul className="nice-list">
          <li>
            <a
              href="https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/90094"
              target="_blank"
              rel="noreferrer"
            >
              Safe Spaces Act (RA 11313) — Judiciary eLibrary
            </a>
          </li>
          <li>Anti-Sexual Harassment Act (RA 7877) — workplace/education contexts</li>
          <li>
            Campus student handbook / CODI or equivalent anti-sexual harassment
            mechanisms (confirm with FEU Tech offices)
          </li>
        </ul>
      </section>
    </div>
  );
}
