import { useEffect, useState } from "react";
import { api } from "../api";

const DEFAULT =
  "I pledge to pause before I joke, listen before I judge, and choose acceptance over tolerance.";

export default function Pledge() {
  const [pledges, setPledges] = useState([]);
  const [display_name, setName] = useState("");
  const [message, setMessage] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
      const res = await api.createPledge({
        display_name: display_name || "Anonymous",
        message,
      });
      setStatus(res.message);
      setName("");
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
          <span className="pill">Pledge wall</span>
          <h1>Choose acceptance</h1>
          <p className="lead">
            Mag-commit bilang student — name, nickname, initials, or anonymous.
          </p>
        </header>
        <img
          src="/art/pledge-hands.jpg"
          alt="Open hands releasing a heart of inclusion and pride colors"
          className="page-hero-art"
        />
      </div>

      <div className="kapwa-layout">
        <section>
          <div className="section-head-row">
            <h2 className="section-title left">Community pledges</h2>
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
              <strong>Wall is waiting</strong>
              <p>Be the first student to post a pledge.</p>
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
          <h2>Make your pledge</h2>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Your pledge
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <label>
              Display name (optional)
              <input
                value={display_name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous / nickname"
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              Post my pledge
            </button>
          </form>
          {status && <p className="alert success" role="status">{status}</p>}
          {error && <p className="alert error" role="alert">{error}</p>}
        </aside>
      </div>
    </div>
  );
}
