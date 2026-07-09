import { Link } from "react-router-dom";

const cards = [
  {
    title: "Microaggressions",
    body: "Everyday digs that chip away at belonging. Intent ≠ impact.",
    to: "/learn",
  },
  {
    title: "Tolerance vs Acceptance",
    body: "Tolerance = allow to exist. Acceptance = respect, support, include.",
  },
  {
    title: "Harmful “jokes”",
    body: "If the punchline is someone’s identity, rethink the joke.",
  },
  {
    title: "Legal awareness",
    body: "Some harassment — especially gender-based — can have legal consequences.",
    to: "/legal",
  },
  {
    title: "Respectful communication",
    body: "Pause. Ask. Listen. Apologize when needed. Repair when possible.",
  },
  {
    title: "Take action",
    body: "Practice with scenarios, then make a public pledge.",
    to: "/quiz",
  },
];

export default function Hinto() {
  return (
    <div className="page">
      <header className="page-header">
        <span className="pill pill-alt">H.I.N.T.O.</span>
        <h1>Pause. Reflect. Learn.</h1>
        <p className="lead">
          The awareness hub — stop harmful patterns before they continue.
        </p>
      </header>

      <section className="panel banner">
        <p>
          <strong>H.I.N.T.O.</strong> is your cue to stop, check yourself, and choose
          better. Hindi para shame-an ang tao — para turuan ang culture.
        </p>
      </section>

      <section className="card-grid">
        {cards.map((c) => (
          <article key={c.title} className="feature-card">
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            {c.to && (
              <Link to={c.to} className="text-link">
                Open →
              </Link>
            )}
          </article>
        ))}
      </section>

      <section className="grid-2">
        <div className="panel prose">
          <h2>Tolerance vs acceptance</h2>
          <p>
            <strong>Tolerance</strong> can sound like: “Okay lang sila, basta huwag sa
            harapan ko / basta may conditions.”
          </p>
          <p>
            <strong>Acceptance</strong> looks like equal respect: same dignity, same
            safety, same chance to show up fully — without special rules that only
            apply to marginalized peers.
          </p>
        </div>
        <div className="panel panel-alt prose">
          <h2>Quick self-check</h2>
          <ul className="nice-list">
            <li>Would I say this if the person was in power over me?</li>
            <li>Is the joke funny only because someone is the punchline?</li>
            <li>Am I defending “intent” more than listening to impact?</li>
            <li>What would support look like right now?</li>
          </ul>
        </div>
      </section>

      <div className="btn-row">
        <Link className="btn btn-primary" to="/legal">
          Know your rights
        </Link>
        <Link className="btn btn-ghost" to="/resources">
          FEU Tech resources
        </Link>
      </div>
    </div>
  );
}
