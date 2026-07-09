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
      <header className="page-header">
        <span className="pill">Pledge wall</span>
        <h1>Choose acceptance</h1>
        <p className="lead">
          Mag-commit sa mas inclusive campus — name, nickname, initials, or anonymous.
        </p>
      </header>

      <section className="panel">
        <form className="form" onSubmit={onSubmit}>
          <label>
            Your pledge
            <textarea
              rows={3}
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
      </section>

      <section className="section">
        <h2 className="section-title">Wall</h2>
        {loading && <p>Loading…</p>}
        <div className="pledge-grid">
          {pledges.map((p) => (
            <article key={p.id} className="pledge-card">
              <p>“{p.message}”</p>
              <footer>— {p.display_name}</footer>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
