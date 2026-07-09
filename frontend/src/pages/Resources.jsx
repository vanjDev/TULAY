export default function Resources() {
  return (
    <div className="page narrow">
      <header className="page-header">
        <span className="pill">Resources</span>
        <h1>Support & contacts</h1>
        <p className="lead">
          FEU Tech campus offices (public directory) and national helplines. Verify
          details if you need immediate help.
        </p>
      </header>

      <section className="panel">
        <h2>FEU Institute of Technology</h2>
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
        <p className="muted">
          Note: For formal gender-based harassment complaints, ask campus offices about
          the proper committee/process for educational institutions under RA 11313 /
          school policy. Contact details may change — confirm with official channels.
        </p>
      </section>

      <section className="panel panel-alt">
        <h2>National / emergency support</h2>
        <div className="resource-list">
          <div>
            <strong>Emergency</strong>
            <p>911</p>
          </div>
          <div>
            <strong>NCMH Crisis Hotline</strong>
            <p>1553 (Luzon-wide landline) · 0917-899-8727 · 0908-639-2672</p>
          </div>
          <div>
            <strong>PNP Women and Children Protection / Aling Pulis</strong>
            <p>0919-777-7377 · published WCPC landlines via official channels</p>
          </div>
          <div>
            <strong>NBI Anti-VAWC Division</strong>
            <p>(02) 8525-6028 (public listings)</p>
          </div>
          <div>
            <strong>Public Attorney’s Office</strong>
            <p>(02) 8929-9436 (locals per PAO guidance)</p>
          </div>
        </div>
      </section>

      <section className="panel prose">
        <h2>Laws & reading</h2>
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
