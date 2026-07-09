import { Link } from "react-router-dom";

const actions = [
  { to: "/learn", label: "Learn", desc: "Workshops & Resources", icon: "📖" },
  { to: "/kapwa", label: "Share", desc: "Student Voices", icon: "💬" },
  { to: "/quiz", label: "Reflect", desc: "Scenario Quiz", icon: "🪞" },
  { to: "/pledge", label: "Pledge Rights", desc: "Commit to Inclusion", icon: "✍️" },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">FEU Tech</span>
            <span className="pill pill-alt">Gender Equality</span>
            <span className="pill pill-soft">LGBTQIA+ Inclusion</span>
          </div>
          <h1>
            Bridging Tolerance
            <br />
            <span className="underline">to Acceptance</span>
          </h1>
          <p className="hero-sub">
            Project TULAY — FEU Tech&apos;s Gender Equality &amp; LGBTQIA+ Inclusion
            Campaign
          </p>
          <p className="hero-tag">
            “Hindi sapat ang tolerance. Dapat may acceptance.”
          </p>
          <p>
            A student-centered digital campaign that helps campus communities unlearn
            prejudice, recognize microaggressions, and build safer spaces for women,
            LGBTQIA+ students, and all marginalized peers.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/pledge">
              Take the Pledge
            </Link>
            <Link className="btn btn-ghost" to="/hinto">
              Explore H.I.N.T.O.
            </Link>
          </div>
        </div>

        <div className="hero-visual hero-visual-img">
          <img
            src="/art/hero-bridge.jpg"
            alt="Diverse FEU Tech students standing together under a golden bridge of inclusion"
            className="hero-art"
          />
        </div>
      </section>

      <section className="action-strip">
        <div className="action-strip-inner">
          <div className="action-grid">
            {actions.map((a) => (
              <Link key={a.to} to={a.to} className="action-card">
                <span className="action-icon">{a.icon}</span>
                <strong>{a.label}</strong>
                <span>{a.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section two-col">
        <div className="panel">
          <span className="badge">K.A.P.W.A.</span>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.6rem", margin: "0.4rem 0" }}>
            Safe space for shared experiences
          </h3>
          <p>
            Mag-share o magbasa ng stories tungkol sa discrimination, exclusion, o
            microaggressions — anonymously or with a name. Moderated for safety.
          </p>
          <Link to="/kapwa" className="text-link">
            Open the wall →
          </Link>
        </div>
        <div className="panel panel-alt">
          <span className="badge badge-alt" style={{ background: "rgba(212,175,55,0.2)", color: "#f5e6a8", borderColor: "rgba(212,175,55,0.35)" }}>
            H.I.N.T.O.
          </span>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.6rem", margin: "0.4rem 0" }}>
            Pause, reflect, and learn
          </h3>
          <p>
            Stop harmful patterns before they continue. Explainers, examples, better
            alternatives — plus careful legal awareness.
          </p>
          <Link to="/hinto" className="text-link">
            Enter the hub →
          </Link>
        </div>
      </section>

      <section className="section banner">
        <p style={{ margin: 0 }}>
          Hindi ito para mang-call out lang. Para ito matuto, mag-unlearn, at maging
          mas aware sa epekto ng words and actions natin.
        </p>
      </section>
    </div>
  );
}
