import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { loadParticipantSession } from "../auth";

const DEFAULT =
  "I leave this plank to include, not only tolerate — to listen before I joke, and to help classmates belong.";

export default function Pledge() {
  const [pledges, setPledges] = useState([]);
  const [message, setMessage] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const session = loadParticipantSession();
  const participant = session?.participant;

  async function load() {
    setLoading(true);
    try {
      setPledges(await api.getPledges());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");
    setError("");
    try {
      if (!session?.access_token) return;
      const res = await api.createPledge(session.access_token, { message });
      setStatus(res.message);
      setMessage(DEFAULT);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Feature 5 · Leave Your Mark</span>
          <h1>Leave your plank</h1>
          <p className="lead">
            Digital commitment planks — the online twin of the bridge display at
            Bridge to Belonging. Sign in to leave your mark.
          </p>
        </header>
        <img
          src="/art/v2/pledge-hands.png"
          alt="Open hands releasing a heart of inclusion and pride colors"
          className="page-hero-art"
        />
      </div>

      <div className="kapwa-layout">
        <section>
          <div className="section-head-row">
            <h2 className="section-title left">Planks on the digital bridge</h2>
            {!loading && (
              <span className="count-pill">{pledges.length} voices</span>
            )}
          </div>
          {loading && (
            <div className="skeleton-grid" aria-busy="true" aria-label="Loading pledges">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          )}
          {!loading && pledges.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                ✊
              </span>
              <strong>Bridge is waiting</strong>
              <p>Be the first student to leave a plank.</p>
            </div>
          )}
          <div className="pledge-grid">
            {pledges.map((p) => (
              <article key={p.id} className="pledge-card hover-lift">
                <p>“{p.message}”</p>
                <footer>— {p.display_name}</footer>
              </article>
            ))}
          </div>
        </section>

        <aside className="share-panel">
          <h2>Write your plank</h2>
          {!participant ? (
            <div className="form">
              <p className="share-note">Sign in with your student account to add a pledge.</p>
              <Link className="btn btn-primary btn-block" to="/login">
                Sign in to pledge
              </Link>
              <Link className="btn btn-ghost btn-block" to="/register">
                Create an account
              </Link>
            </div>
          ) : (
          <form className="form" onSubmit={onSubmit}>
            <p className="share-note">
              Pledging as <strong>{participant.username || participant.full_name}</strong>.
            </p>
            <label>
              Your commitment to inclusion
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              Attach my plank
            </button>
          </form>
          )}
          {status && <p className="alert success" role="status">{status}</p>}
          {error && <p className="alert error" role="alert">{error}</p>}
        </aside>
      </div>
    </div>
  );
}
