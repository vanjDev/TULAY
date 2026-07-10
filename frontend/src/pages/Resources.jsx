export default function Resources() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Support</span>
          <h1>Help for students</h1>
          <p className="lead">
            Start with your campus offices, then use national helplines when you need
            urgent support. Verify details with your school.
          </p>
        </header>
        <img
          src="/art/resources-support.jpg"
          alt="Warm campus doorway symbolizing guidance and student support"
          className="page-hero-art"
        />
      </div>

      <section className="panel hover-lift">
        <h2 className="panel-title">On your campus</h2>
        <p className="muted">
          Every school is different. Ask your student handbook or admin for the exact
          office names and contacts.
        </p>
        <div className="resource-list">
          <div>
            <strong>Guidance / Counseling Office</strong>
            <p>Mental health, stress, and confidential listening support for students</p>
          </div>
          <div>
            <strong>Student Affairs / Discipline</strong>
            <p>Conduct concerns, mediation, and campus safety processes</p>
          </div>
          <div>
            <strong>Anti-sexual harassment / CODI desk</strong>
            <p>Gender-based harassment reporting (check your school’s official process)</p>
          </div>
          <div>
            <strong>Trusted org / peer support</strong>
            <p>Student orgs, LGBTQIA+ alliances, women’s groups, peer mentors</p>
          </div>
        </div>
      </section>

      <section className="panel panel-alt hover-lift" style={{ marginTop: "1.1rem" }}>
        <h2>National / emergency support</h2>
        <div className="resource-list">
          <div className="resource-on-dark">
            <strong>Emergency</strong>
            <p>911</p>
          </div>
          <div className="resource-on-dark">
            <strong>NCMH Crisis Hotline</strong>
            <p>1553 (Luzon-wide landline) · 0917-899-8727 · 0908-639-2672</p>
          </div>
          <div className="resource-on-dark">
            <strong>PNP Women and Children Protection / Aling Pulis</strong>
            <p>0919-777-7377 · published WCPC landlines via official channels</p>
          </div>
          <div className="resource-on-dark">
            <strong>NBI Anti-VAWC Division</strong>
            <p>(02) 8525-6028 (public listings)</p>
          </div>
          <div className="resource-on-dark">
            <strong>Public Attorney’s Office</strong>
            <p>(02) 8929-9436 (locals per PAO guidance)</p>
          </div>
        </div>
      </section>

      <section className="panel prose hover-lift" style={{ marginTop: "1.1rem" }}>
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
          <li>Your campus student handbook and anti-sexual harassment policies</li>
        </ul>
      </section>
    </div>
  );
}
