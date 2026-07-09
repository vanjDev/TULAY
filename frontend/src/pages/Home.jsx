import { Link } from "react-router-dom";

const actions = [
  { to: "/learn", label: "Learn", emoji: "🧠", desc: "Microaggressions 101" },
  { to: "/kapwa", label: "Share", emoji: "💬", desc: "K.A.P.W.A. stories" },
  { to: "/quiz", label: "Reflect", emoji: "🎮", desc: "Scenario quiz" },
  { to: "/pledge", label: "Pledge", emoji: "✊", desc: "Choose acceptance" },
  { to: "/legal", label: "Know Your Rights", emoji: "⚖️", desc: "Safe Spaces Act" },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">FEU Tech</span>
            <span className="pill pill-alt">Campus Campaign</span>
            <span className="pill pill-soft">Youth-led · Inclusive</span>
          </div>
          <h1>
            Project <span className="gradient-text">T.U.L.A.Y.</span>
          </h1>
          <p className="lead">
            <strong>T</strong>ransforming <strong>U</strong>nderstanding through{" "}
            <strong>L</strong>earning, <strong>A</strong>cceptance, and{" "}
            <strong>Y</strong>ou
          </p>
          <p className="hero-tag">
            “Hindi sapat ang tolerance. Dapat may acceptance.”
          </p>
          <p>
            A student-centered digital campaign bridging simple tolerance and true
            inclusion — unlearning prejudice, recognizing microaggressions, and
            building safer campus spaces at FEU Institute of Technology.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/hinto">
              Start with H.I.N.T.O.
            </Link>
            <Link className="btn btn-ghost" to="/kapwa">
              Read K.A.P.W.A. stories
            </Link>
          </div>
        </div>
        <div className="hero-card stack-cards">
          <div className="sticker">✨ Unlearn</div>
          <div className="sticker sticker-2">💚 Accept</div>
          <div className="sticker sticker-3">🌉 Bridge</div>
          <div className="info-card">
            <h3>Ano ang T.U.L.A.Y.?</h3>
            <p>
              Tulay = bridge. We bridge awareness and action: from jokes that “seem
              small” to real impact, from “tolerate ka lang” to genuine respect.
            </p>
            <ul className="check-list">
              <li>Recognize microaggressions</li>
              <li>Differentiate tolerance vs acceptance</li>
              <li>Share safely · Reflect · Pledge</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Where do you want to go?</h2>
        <div className="action-grid">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} className="action-card">
              <span className="action-emoji">{a.emoji}</span>
              <strong>{a.label}</strong>
              <span>{a.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section two-col">
        <div className="panel">
          <span className="badge">K.A.P.W.A.</span>
          <h3>Safe space for shared experiences</h3>
          <p>
            Mag-share o magbasa ng stories tungkol sa discrimination, exclusion, o
            microaggressions — anonymously or with a name. Moderated for safety.
          </p>
          <Link to="/kapwa" className="text-link">
            Open the wall →
          </Link>
        </div>
        <div className="panel panel-alt">
          <span className="badge badge-alt">H.I.N.T.O.</span>
          <h3>Pause, reflect, and learn</h3>
          <p>
            Stop harmful patterns before they continue. Explainers, examples, and
            better alternatives — plus legal awareness done carefully.
          </p>
          <Link to="/hinto" className="text-link">
            Enter the hub →
          </Link>
        </div>
      </section>

      <section className="section banner">
        <p>
          Hindi ito para mang-call out lang. Para ito matuto, mag-unlearn, at maging
          mas aware sa epekto ng words and actions natin.
        </p>
      </section>
    </div>
  );
}
