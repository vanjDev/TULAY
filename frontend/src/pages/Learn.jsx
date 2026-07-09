import { Link } from "react-router-dom";

const examples = [
  {
    bad: "“Babae ka kasi, soft skills na lang.”",
    better: "Assume competence. Assign roles based on skills and interest.",
  },
  {
    bad: "Gayahin ang boses ng bakla for laughs",
    better: "Humor that doesn’t use someone’s identity as the punchline.",
  },
  {
    bad: "“Ang dark mo, dapat mag-beauty tips ka.”",
    better: "Compliment without policing appearance or colorism.",
  },
  {
    bad: "“Ang probinsyana ng accent mo.”",
    better: "Listen to the idea. Accents aren’t a flaw.",
  },
];

export default function Learn() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Learn</span>
          <h1>Microaggressions, simply</h1>
          <p className="lead">
            Student-friendly guide for FEU Tech — educational, not lecture mode.
          </p>
        </header>
        <img
          src="/art/hinto-hub.jpg"
          alt="Learning and reflection illustration for microaggression awareness"
          className="page-hero-art"
        />
      </div>

      <section className="panel prose">
        <h2>What is a microaggression?</h2>
        <p>
          Microaggressions are everyday comments, jokes, or actions that put down a
          person based on identity (gender, sexuality, appearance, language,
          culture, status, etc.). Often “small” to the speaker — heavy to the one
          receiving it. Cumulative impact matters.
        </p>
      </section>

      <section className="panel prose" style={{ marginTop: "1.1rem" }}>
        <h2>Why do “small jokes” still matter?</h2>
        <p>
          Because they teach who belongs and who doesn’t. Repeating stereotypes —
          even as biro — normalizes prejudice. For the target, it’s not one joke;
          it’s a pattern that can affect safety, confidence, and participation in
          class or orgs.
        </p>
      </section>

      <section className="panel" style={{ marginTop: "1.1rem" }}>
        <h2 style={{ fontFamily: "var(--display)", fontSize: "1.7rem", color: "var(--forest)" }}>
          Common campus examples
        </h2>
        <div className="compare-list">
          {examples.map((ex) => (
            <div key={ex.bad} className="compare-card">
              <div>
                <span className="label-bad">Instead of</span>
                <p>{ex.bad}</p>
              </div>
              <div>
                <span className="label-good">Try</span>
                <p>{ex.better}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel">
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.45rem" }}>
            How to respond when you hear one
          </h3>
          <ul className="nice-list">
            <li>Check safety first — for you and the person targeted</li>
            <li>Name the impact calmly: “Hindi biro yun for some of us.”</li>
            <li>Support the person privately: “Okay ka lang? Nandito ako.”</li>
            <li>If needed, use campus channels (see Resources)</li>
          </ul>
        </div>
        <div className="panel panel-alt">
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.45rem" }}>
            What to say instead
          </h3>
          <ul className="check-list">
            <li>“Can we not joke about people’s identities?”</li>
            <li>“That stereotype isn’t true / isn’t funny.”</li>
            <li>“Let’s focus on the work, not assumptions.”</li>
            <li>“Sorry — that crossed a line. I’ll do better.”</li>
          </ul>
        </div>
      </section>

      <div className="btn-row" style={{ marginTop: "1.5rem", justifyContent: "center" }}>
        <Link className="btn btn-primary" to="/hinto">
          Go deeper in H.I.N.T.O.
        </Link>
        <Link className="btn btn-ghost" to="/quiz">
          Try the scenario quiz
        </Link>
      </div>
    </div>
  );
}
