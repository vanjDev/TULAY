import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Eye,
  Handshake,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { campaign, features } from "../campaign";

const featureIcons = {
  1: Eye,
  2: Search,
  3: MessageCircle,
  4: Sparkles,
  5: PenLine,
};

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">Students</span>
            <span className="pill pill-alt">LGBTQIA+</span>
            <span className="pill pill-soft">Campus</span>
          </div>
          <h1>
            Bridge to
            <br />
            <span className="underline">Belonging</span>
          </h1>
          <p className="hero-tag">“{campaign.shortTagline}”</p>
          <p className="hero-body">
            From tolerance to true inclusion — connection, practice, and a public
            commitment.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/bridge">
              <Handshake size={18} strokeWidth={2.2} aria-hidden="true" />
              Join Bridge
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link className="btn btn-ghost" to="/about">
              How it works
            </Link>
          </div>
          <div className="hero-trust">
            <span>
              <Sparkles size={15} strokeWidth={2} aria-hidden="true" /> 5 features
            </span>
            <span>
              <MessageCircle size={15} strokeWidth={2} aria-hidden="true" /> Taglish OK
            </span>
            <span>
              <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" /> Moderated
            </span>
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
            <strong>Tolerance ≠ inclusion</strong>
            <span>See the gap. Cross it together.</span>
          </div>
        </div>
      </section>

      <section className="journey-band" aria-label="Tolerance to Belonging">
        <div className="section-label">The path</div>
        <h2 className="section-title">
          Tolerance → Acceptance → Inclusion → Belonging
        </h2>
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
        <h2 className="section-title left">What we do</h2>
        <div className="feature-journey">
          {features.map((f) => {
            const Icon = featureIcons[f.n] || Sparkles;
            return (
              <article key={f.n} className="feature-journey-card hover-lift">
                <div className="feature-journey-head">
                  <span className="feature-n">{f.n}</span>
                  <span className="feature-stage">{f.stage}</span>
                </div>
                <span className="feature-icon-wrap" aria-hidden="true">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3>
                  {f.title}{" "}
                  <span className="feature-sub">({f.subtitle})</span>
                </h3>
                <p>{shorten(f.body, 140)}</p>
                <Link to={f.to} className="text-link">
                  Open
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section two-col">
        <div className="panel hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge">Live</span>
            <span className="feature-icon-wrap soft" aria-hidden="true">
              <Handshake size={20} strokeWidth={2} />
            </span>
          </div>
          <h3 className="panel-title">Bridge Circles</h3>
          <p>Interest groups, reflection, and commitment planks — Features 3–5 in person.</p>
          <Link to="/bridge" className="text-link">
            How a circle works
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
        <div className="panel panel-alt hover-lift feature-panel">
          <div className="feature-panel-top">
            <span className="badge badge-on-dark">Always on</span>
            <span className="feature-icon-wrap soft on-dark" aria-hidden="true">
              <BookOpen size={20} strokeWidth={2} />
            </span>
          </div>
          <h3 className="panel-title">Digital bridge</h3>
          <p>Learn, share, practice, and pledge anytime — no booth required.</p>
          <Link to="/learn" className="text-link">
            Start with Learn
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section banner">
        <p>
          Hindi sapat ang tolerance. Belonging is the destination — inclusion is
          the path.
        </p>
      </section>

      <section className="cta-band">
        <div>
          <h2>Leave your plank</h2>
          <p>Practice a scenario, then commit publicly.</p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/pledge">
            <PenLine size={18} strokeWidth={2.2} aria-hidden="true" />
            Pledge
          </Link>
          <Link className="btn btn-ghost-light" to="/quiz">
            Practice first
          </Link>
        </div>
      </section>
    </div>
  );
}

function shorten(text, max) {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trim()}…`;
}
