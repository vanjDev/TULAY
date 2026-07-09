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
            Mag-commit sa mas inclusive FEU Tech campus — name, nickname, initials, or
            anonymous.
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
          <h2 className="section-title" style={{ textAlign: "left" }}>
            Community pledges
          </h2>
          {loading && <p className="muted">Loading…</p>}
          <div className="pledge-grid">
            {pledges.map((p) => (
              <article key={p.id} className="pledge-card">
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
            <button className="btn btn-primary" type="submit">
              Post my pledge
            </button>
          </form>
          {status && <p className="alert success">{status}</p>}
          {error && <p className="alert error">{error}</p>}
        </aside>
      </div>
    </div>
  );
}
