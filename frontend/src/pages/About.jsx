import { Link } from "react-router-dom";
import { campaign, features } from "../campaign";

export default function About() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">About the campaign</span>
          <h1>{campaign.name}</h1>
          <p className="lead">{campaign.expansion}</p>
          <p className="hero-tag">{campaign.tagline}</p>
        </header>
        <img
          src="/art/hero-bridge.jpg"
          alt="Students united under a bridge representing Project TULAY"
          className="page-hero-art"
        />
      </div>

      <section className="prose panel hover-lift">
        <h2>A campus campaign for true inclusion</h2>
        <p>
          {campaign.subtitle}. {campaign.purpose}
        </p>
        <p>
          Anti-discrimination policies protect LGBTQIA+ individuals in many
          spaces, but legal protection does not automatically translate into
          lived inclusion. This project is built around one distinction:{" "}
          <strong>tolerance is not the same as inclusion</strong>.
        </p>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel prose hover-lift">
          <h2>The problem</h2>
          <p>
            We examine the progression{" "}
            <strong>Tolerance → Acceptance → Inclusion → Belonging</strong>.
            Many LGBTQIA+ individuals remain stuck between tolerance and
            acceptance — technically protected, but not genuinely included in
            everyday social spaces.
          </p>
          <p>
            That gap is sustained by microaggressions: jokes, traditions, or
            casual “preferences” that reinforce stereotypes and quietly signal
            that LGBTQIA+ students are outsiders, even in spaces that claim to
            be accepting.
          </p>
        </div>
        <div className="panel panel-alt prose hover-lift">
          <h2>Example</h2>
          <p>
            A gay man is excluded from a friend&apos;s debut for being “too
            bading,” or left out of sports for being malata. No one calls it
            discrimination — it is framed as preference or humor. The effect is
            the same: <strong>tolerated, not included</strong>.
          </p>
          <p>
            T.U.L.A.Y. surfaces those everyday behaviors and creates structured
            spaces — online and on campus — where people can move from passive
            tolerance into genuine connection and belonging.
          </p>
        </div>
      </section>

      <section className="section" style={{ marginTop: "1.5rem" }}>
        <div className="section-label">Features 1–5</div>
        <h2 className="section-title left">Aligned to the core idea</h2>
        <p className="muted" style={{ maxWidth: "40rem", marginBottom: "1rem" }}>
          Public features follow the bridge people need to cross — not only the
          logistics of a single event day.
        </p>
        <div className="feature-list">
          {features.map((f) => (
            <article key={f.n} className="feature-list-item panel hover-lift">
              <div className="feature-journey-head">
                <span className="feature-n">Feature {f.n}</span>
                <span className="feature-stage">{f.stage}</span>
              </div>
              <h3>
                {f.title}{" "}
                <span className="feature-sub">({f.subtitle})</span>
              </h3>
              <p>{f.body}</p>
              <Link to={f.to} className="text-link">
                Open on the site →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel hover-lift">
          <h3 className="panel-title">On this website</h3>
          <ul className="check-list">
            <li>Learn the gap &amp; microaggressions</li>
            <li>H.I.N.T.O. pause-and-reflect hub</li>
            <li>K.A.P.W.A. moderated story wall</li>
            <li>Scenario practice &amp; digital planks</li>
            <li>Rights awareness &amp; support links</li>
          </ul>
        </div>
        <div className="panel hover-lift">
          <h3 className="panel-title">On campus</h3>
          <ul className="check-list">
            <li>Bridge to Belonging activity</li>
            <li>Interest-based Bridge Circles</li>
            <li>Guided reflection themes</li>
            <li>Physical commitment planks</li>
            <li>Booths, spaces, and other activities</li>
          </ul>
          <Link to="/bridge" className="text-link" style={{ marginTop: "0.75rem", display: "inline-block" }}>
            Bridge to Belonging details →
          </Link>
        </div>
      </section>

      <section className="section banner">
        <p>
          Project T.U.L.A.Y. is not only a website. It is a bridge — digital and
          human — toward campus cultures where every student is not merely
          tolerated, but included and free to belong.
        </p>
      </section>
    </div>
  );
}
