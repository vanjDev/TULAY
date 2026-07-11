import { Link } from "react-router-dom";
import { campaign, features } from "../campaign";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">For students</span>
            <span className="pill pill-alt">LGBTQIA+ inclusion</span>
            <span className="pill pill-soft">Campus campaign</span>
          </div>
          <h1>
            Bridge to
            <br />
            <span className="underline">Belonging</span>
          </h1>
          <p className="hero-sub">
            {campaign.name} — {campaign.expansion}
          </p>
          <p className="hero-tag">“{campaign.tagline}”</p>
          <p className="hero-body">
            Legal protection is not the same as lived inclusion. This campaign
            closes the gap from tolerance to true belonging — surfacing
            microaggressions, building real connection, and inviting every
            student to choose inclusion on purpose.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/bridge">
              Bridge to Belonging
            </Link>
            <Link className="btn btn-ghost" to="/about">
              How TULAY works
            </Link>
          </div>
          <div className="hero-trust">
            <span>🌉 Five features</span>
            <span>💬 Taglish-friendly</span>
            <span>🛡️ Safe &amp; moderated</span>
          </div>
        </div>

        <div className="hero-visual hero-visual-img">
          <img
            src="/art/hero-bridge.jpg"
            alt="Diverse students standing together under a golden bridge of inclusion"
            className="hero-art"
            loading="eager"
          />
          <div className="hero-float-card">
            <strong>Tolerance is not inclusion.</strong>
            <span>See the gap. Cross it together.</span>
          </div>
        </div>
      </section>

      <section className="journey-band" aria-label="Tolerance to Belonging">
        <div className="section-label">The progression we care about</div>
        <h2 className="section-title">
          Tolerance → Acceptance → Inclusion → Belonging
        </h2>
        <p className="muted journey-lead">
          Many LGBTQIA+ students remain stuck between tolerance and acceptance —
          technically protected, not genuinely included. T.U.L.A.Y. is built to
          move people further along this bridge.
        </p>
        <ol className="journey-track">
          {campaign.progression.map((stage, i) => (
            <li key={stage} className="journey-step">
              <span className="journey-num">{i + 1}</span>
              <strong>{stage}</strong>
              {i < campaign.progression.length - 1 && (
                <span className="journey-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-label="Campaign features">
        <div className="section-label">Features 1–5</div>
        <h2 className="section-title left">What Project T.U.L.A.Y. does</h2>
        <p className="muted" style={{ maxWidth: "40rem", marginBottom: "1.25rem" }}>
          Five features aligned to our core idea — not just event logistics.
        </p>
        <div className="feature-journey">
          {features.map((f) => (
            <article key={f.n} className="feature-journey-card hover-lift">
              <div className="feature-journey-head">
                <span className="feature-n">Feature {f.n}</span>
                <span className="feature-stage">{f.stage}</span>
              </div>
              <span className="feature-emoji" aria-hidden="true">
                {f.icon}
              </span>
              <h3>
                {f.title}{" "}
                <span className="feature-sub">({f.subtitle})</span>
              </h3>
              <p>{f.body}</p>
              <Link to={f.to} className="text-link">
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-col">
        <div className="panel hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge">Live activity</span>
            <span className="feature-emoji" aria-hidden="true">
              🤝
            </span>
          </div>
          <h3 className="panel-title">Bridge to Belonging</h3>
          <p>
            Our flagship campus activity: interest-based Bridge Circles, guided
            reflection, and commitment planks — how Features 3–5 happen in person.
          </p>
          <Link to="/bridge" className="text-link">
            See how a circle works →
          </Link>
        </div>
        <div className="panel panel-alt hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge badge-on-dark">Always open</span>
            <span className="feature-emoji" aria-hidden="true">
              🌐
            </span>
          </div>
          <h3 className="panel-title">This website is the digital bridge</h3>
          <p>
            Learn the gap, share stories, practice scenarios, and leave a digital
            plank anytime — even when there is no booth on campus.
          </p>
          <Link to="/learn" className="text-link">
            Start with Learn →
          </Link>
        </div>
      </section>

      <section className="section banner">
        <p>
          Hindi sapat ang tolerance. Hindi rin sapat ang “okay lang sila” kung
          hindi sila kasama. Belonging is the destination — inclusion is how we
          get there.
        </p>
      </section>

      <section className="cta-band">
        <div>
          <h2>Leave your plank</h2>
          <p>
            Practice a scenario, then post a public commitment to inclusion.
          </p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/pledge">
            Digital plank
          </Link>
          <Link className="btn btn-ghost-light" to="/quiz">
            Practice first
          </Link>
        </div>
      </section>
    </div>
  );
}
