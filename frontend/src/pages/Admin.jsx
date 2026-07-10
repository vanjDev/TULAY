import { useEffect, useState } from "react";
import { api } from "../api";

const TOKEN_KEY = "tulay_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState(null);
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refresh(t = token) {
    if (!t) return;
    setLoading(true);
    setError("");
    try {
      const [s, list] = await Promise.all([
        api.adminStats(t),
        api.adminStories(t, filter === "all" ? undefined : filter),
      ]);
      setStats(s);
      setStories(list);
    } catch (e) {
      setError(e.message);
      if (
        e.message.toLowerCase().includes("token") ||
        e.message.toLowerCase().includes("unauthorized") ||
        e.message.includes("401")
      ) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) refresh(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filter]);

  async function login(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.adminLogin(password);
      localStorage.setItem(TOKEN_KEY, res.access_token);
      setToken(res.access_token);
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setStats(null);
    setStories([]);
  }

  async function moderate(id, action) {
    try {
      if (action === "approve") await api.approveStory(token, id);
      else await api.rejectStory(token, id);
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  if (!token) {
    return (
      <div className="page narrow">
        <div className="page-hero-band">
          <header className="page-header">
            <span className="pill">Admin</span>
            <h1>Moderator login</h1>
            <p className="lead">Review pending K.A.P.W.A. stories.</p>
          </header>
        </div>
        <form className="panel form" onSubmit={login}>
          <label>
            Admin password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Default dev: tulay-admin"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Log in
          </button>
          {error && <p className="alert error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-hero-band">
        <header className="page-header">
          <span className="pill">Admin desk</span>
          <h1>Moderation</h1>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-ghost" onClick={() => refresh()}>
              Refresh
            </button>
            <button type="button" className="btn btn-soft" onClick={logout}>
              Log out
            </button>
          </div>
        </header>
      </div>

      {stats && (
        <div className="stats-row" style={{ justifyContent: "center" }}>
          <div className="stat">
            <strong>{stats.pending_stories}</strong>
            <span>Pending</span>
          </div>
          <div className="stat">
            <strong>{stats.approved_stories}</strong>
            <span>Approved</span>
          </div>
          <div className="stat">
            <strong>{stats.rejected_stories}</strong>
            <span>Rejected</span>
          </div>
          <div className="stat">
            <strong>{stats.pledges}</strong>
            <span>Pledges</span>
          </div>
        </div>
      )}

      <div className="chip-row" style={{ marginBottom: "1rem", justifyContent: "center" }}>
        {["pending", "approved", "rejected", "all"].map((f) => (
          <button
            key={f}
            type="button"
            className={`chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="skeleton-grid" aria-busy="true" aria-label="Loading">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      )}
      {error && <p className="alert error" role="alert">{error}</p>}

      {!loading && stories.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">
            ✅
          </span>
          <strong>Inbox clear</strong>
          <p>No stories in this filter right now.</p>
        </div>
      )}

      <div className="story-grid">
        {stories.map((s) => (
          <article key={s.id} className="story-card">
            <div className="story-meta">
              <span className="chip active">{s.status}</span>
              <span className="muted">#{s.category}</span>
              <span className="muted">{s.display_name}</span>
            </div>
            <p>{s.body}</p>
            {s.status === "pending" && (
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => moderate(s.id, "approve")}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-soft"
                  onClick={() => moderate(s.id, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
