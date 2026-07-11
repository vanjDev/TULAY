import { useEffect, useState } from "react";
import { api } from "../api";

const CATEGORIES = [
  { value: "gender", label: "Gender" },
  { value: "sexuality", label: "Sexuality" },
  { value: "appearance", label: "Appearance" },
  { value: "language", label: "Language" },
  { value: "culture", label: "Culture" },
  { value: "social_status", label: "Social status" },
  { value: "other", label: "Other" },
];

const ICONS = {
  gender: "👤",
  sexuality: "🏳️‍🌈",
  appearance: "✨",
  language: "📖",
  culture: "🌏",
  social_status: "🤝",
  other: "💭",
};

export default function Kapwa() {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    body: "",
    display_name: "",
    category: "other",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getStories();
      setStories(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const visible =
    filter === "all" ? stories : stories.filter((s) => s.category === filter);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");
    try {
      const res = await api.submitStory({
        body: form.body,
        display_name: form.display_name || "Anonymous",
        category: form.category,
      });
      setSuccess(res.message);
      setForm({ body: "", display_name: "", category: "other" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onRelate(id) {
    try {
      const updated = await api.relateStory(id);
      setStories((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Feature 3 · Hear Each Other</span>
          <h1>Student experience wall</h1>
          <p className="lead">
            A safe space for sharing lived experiences. Your story matters.
          </p>
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            May naranasan ka bang joke, comment, or treatment na parang maliit lang sa
            iba pero mabigat para sa&apos;yo?
          </p>
        </header>
        <img
          src="/art/kapwa-stories.jpg"
          alt="Illustrated community story wall representing shared student experiences"
          className="page-hero-art"
        />
      </div>

      <div className="kapwa-layout">
        <div>
          <div className="chip-row filters" role="tablist" aria-label="Story categories">
            <button
              type="button"
              className={`chip ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`chip ${filter === c.value ? "active" : ""}`}
                onClick={() => setFilter(c.value)}
              >
                #{c.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="skeleton-grid" aria-busy="true" aria-label="Loading stories">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          )}
          {!loading && visible.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                📝
              </span>
              <strong>No stories here yet</strong>
              <p>Wala pang approved stories sa filter na ito. Be the first to share.</p>
            </div>
          )}

          <div className="story-grid">
            {visible.map((story) => (
              <article key={story.id} className="story-card hover-lift">
                <div className="avatar-icon">{ICONS[story.category] || "💭"}</div>
                <div className="story-meta">
                  <span className="chip active">#{story.category.replace("_", " ")}</span>
                  <span className="muted">— {story.display_name}</span>
                </div>
                <p>{story.body}</p>
                {story.reflection_prompt && (
                  <div className="reflection">
                    <strong>Reflect:</strong> {story.reflection_prompt}
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-soft"
                  onClick={() => onRelate(story.id)}
                >
                  ♥ I relate · {story.relate_count}
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="share-panel">
          <h2>Share your story</h2>
          <p className="share-note">
            Moderated before public — para mas safe ang space for students.
          </p>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Your story
              <textarea
                required
                minLength={10}
                rows={5}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Your story is safe here… (optional: stay anonymous)"
              />
            </label>
            <label>
              Display name (optional)
              <input
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="Anonymous / nickname / initials"
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Submit to the wall"}
            </button>
          </form>
          {success && <p className="alert success" role="status">{success}</p>}
          {error && <p className="alert error" role="alert">{error}</p>}
        </aside>
      </div>
    </div>
  );
}
