import { Link } from "react-router-dom";

const actions = [
  { to: "/learn", label: "Learn", desc: "Understand microaggressions", icon: "📖", step: "01" },
  { to: "/kapwa", label: "Share", desc: "Student voices & stories", icon: "💬", step: "02" },
  { to: "/quiz", label: "Reflect", desc: "Practice real scenarios", icon: "🪞", step: "03" },
  { to: "/pledge", label: "Pledge", desc: "Choose acceptance daily", icon: "✍️", step: "04" },
];

const highlights = [
  {
    title: "Unlearn",
    text: "Prejudice is often learned — so it can be unlearned.",
    icon: "🌱",
  },
  {
    title: "Recognize",
    text: "Name the jokes and habits that quietly harm peers.",
    icon: "👁️",
  },
  {
    title: "Act",
    text: "Small choices in class, group chats, and orgs matter.",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">For students</span>
            <span className="pill pill-alt">Gender equality</span>
            <span className="pill pill-soft">LGBTQIA+ inclusion</span>
          </div>
          <h1>
            Bridging Tolerance
            <br />
            <span className="underline">to Acceptance</span>
          </h1>
          <p className="hero-sub">
            Project TULAY — a student campaign for safer, kinder campus spaces
          </p>
          <p className="hero-tag">
            “Hindi sapat ang tolerance. Dapat may acceptance.”
          </p>
          <p className="hero-body">
            A digital bridge from awareness to action: unlearn prejudice, recognize
            microaggressions, and show up for women, LGBTQIA+ classmates, and every
            student who deserves to belong.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/pledge">
              Take the Pledge
            </Link>
            <Link className="btn btn-ghost" to="/hinto">
              Start learning
            </Link>
          </div>
          <div className="hero-trust">
            <span>⏱ A few minutes</span>
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
            <strong>Not call-outs.</strong>
            <span>Learning. Unlearning. Care.</span>
          </div>
        </div>
      </section>

      <section className="highlight-row" aria-label="Campaign pillars">
        {highlights.map((h, i) => (
          <article
            key={h.title}
            className="highlight-card hover-lift"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="highlight-icon" aria-hidden="true">
              {h.icon}
            </span>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </article>
        ))}
      </section>

      <section className="action-strip">
        <div className="action-strip-inner">
          <div className="section-label light">Your path</div>
          <h2 className="strip-title">Four steps toward real inclusion</h2>
          <p className="strip-sub">Pick any step — start where you are.</p>
          <div className="action-grid">
            {actions.map((a) => (
              <Link key={a.to} to={a.to} className="action-card">
                <span className="action-step">{a.step}</span>
                <span className="action-icon">{a.icon}</span>
                <strong>{a.label}</strong>
                <span>{a.desc}</span>
                <span className="action-go">Go →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div className="panel hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge">K.A.P.W.A.</span>
            <span className="feature-emoji" aria-hidden="true">
              💬
            </span>
          </div>
          <h3 className="panel-title">Safe space for shared experiences</h3>
          <p>
            Mag-share o magbasa ng stories tungkol sa discrimination, exclusion, o
            microaggressions — anonymously or with a name. Moderated for safety.
          </p>
          <Link to="/kapwa" className="text-link">
            Open the wall →
          </Link>
        </div>
        <div className="panel panel-alt hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge badge-on-dark">H.I.N.T.O.</span>
            <span className="feature-emoji" aria-hidden="true">
              ⏸️
            </span>
          </div>
          <h3 className="panel-title">Pause, reflect, and learn</h3>
          <p>
            Stop harmful patterns before they continue. Explainers, examples, better
            alternatives — plus careful legal awareness for students.
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

      <section className="cta-band">
        <div>
          <h2>Ready to practice?</h2>
          <p>Try a scenario, then leave a pledge for your classmates.</p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/quiz">
            Take the quiz
          </Link>
          <Link className="btn btn-ghost-light" to="/resources">
            Find support
          </Link>
        </div>
      </section>
    </div>
  );
}
