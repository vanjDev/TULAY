import { Link } from "react-router-dom";
import { campaign, bridgeCircleSteps } from "../campaign";

export default function Bridge() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill pill-alt">Live activity</span>
          <h1>Bridge to Belonging</h1>
          <p className="lead">{campaign.tagline}</p>
          <p className="hero-tag">How Features 3–5 happen in person</p>
        </header>
        <img
          src="/art/hero-bridge.jpg"
          alt="Bridge symbolizing connection across campus differences"
          className="page-hero-art"
        />
      </div>

      <section className="prose panel hover-lift">
        <h2>What is this activity?</h2>
        <p>
          Bridge to Belonging is the flagship campus activity under Project
          T.U.L.A.Y. It uses <strong>shared interests</strong> as an entry point
          so students can connect across differences in identity and background —
          moving beyond surface-level tolerance toward genuine inclusion through
          small-group conversation and guided reflection.
        </p>
        <p>
          On the website you can already learn, share stories, practice, and
          pledge. On activity day, those same goals become a facilitated
          experience: Bridge Circles, reflection themes, and physical commitment
          planks.
        </p>
      </section>

      <section className="panel panel-alt hover-lift" style={{ marginTop: "1.1rem" }}>
        <h2 className="panel-title">Maps to core Features 3–5</h2>
        <ul className="nice-list">
          <li>
            <strong>Feature 3 — Hear Each Other:</strong> interest-based circles
            + optional story sharing
          </li>
          <li>
            <strong>Feature 4 — Practice Belonging:</strong> ground rules +
            reflection prompts (Assumptions, Belonging, Inclusion, Values)
          </li>
          <li>
            <strong>Feature 5 — Leave Your Mark:</strong> commitment planks on a
            physical bridge display (+ digital pledges anytime online)
          </li>
        </ul>
      </section>

      <section className="section" style={{ marginTop: "1.5rem" }}>
        <div className="section-label">Activity flow</div>
        <h2 className="section-title left">From sign-up to crossing the bridge</h2>
        <div className="feature-list">
          {bridgeCircleSteps.map((s) => (
            <article key={s.n} className="feature-list-item panel hover-lift">
              <span className="feature-n">Step {s.n}</span>
              <h3>
                {s.title}{" "}
                <span className="feature-sub">({s.subtitle})</span>
              </h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel prose hover-lift">
          <h2>Ground rules (example)</h2>
          <ul className="nice-list">
            <li>Share only what you are comfortable sharing</li>
            <li>Listen to understand, not to debate identity</li>
            <li>No outing anyone or repeating private stories outside the circle</li>
            <li>Humor is welcome — identity as a punchline is not</li>
            <li>You can pass on any prompt</li>
          </ul>
        </div>
        <div className="panel prose hover-lift">
          <h2>Reflection themes</h2>
          <p>Facilitators deepen conversation across four gender-neutral themes:</p>
          <ul className="check-list">
            <li>Assumptions</li>
            <li>Belonging</li>
            <li>Inclusion</li>
            <li>Values</li>
          </ul>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            Online, you can practice related choices anytime with the scenario quiz.
          </p>
          <Link to="/quiz" className="text-link">
            Open practice scenarios →
          </Link>
        </div>
      </section>

      <section className="cta-band" style={{ marginTop: "1.5rem" }}>
        <div>
          <h2>Can&apos;t join a circle today?</h2>
          <p>
            Walk the digital bridge: learn, share, practice, and leave a plank
            online.
          </p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/pledge">
            Leave a digital plank
          </Link>
          <Link className="btn btn-ghost-light" to="/about">
            Back to Features 1–5
          </Link>
        </div>
      </section>
    </div>
  );
}
