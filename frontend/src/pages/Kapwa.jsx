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
      <header className="page-header">
        <span className="pill">K.A.P.W.A.</span>
        <h1>Experience wall</h1>
        <p className="lead">
          May naranasan ka bang joke, comment, or treatment na parang maliit lang sa
          iba pero mabigat para sa’yo? You may share it here.
        </p>
      </header>

      <section className="panel">
        <h2>Share a story</h2>
        <p className="muted">
          Moderated before public — para mas safe ang space. Optional name; Anonymous
          is okay.
        </p>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Your story
            <textarea
              required
              minLength={10}
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Ikwento nang komportable ka… walang pressure magbigay ng identifying details."
            />
          </label>
          <div className="form-row">
            <label>
              Display name (optional)
              <input
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="Anonymous / nickname / initials"
              />
            </label>
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
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Submit for review"}
          </button>
        </form>
        {success && <p className="alert success">{success}</p>}
        {error && <p className="alert error">{error}</p>}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Stories</h2>
          <div className="chip-row">
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
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading && <p>Loading stories…</p>}
        {!loading && visible.length === 0 && (
          <p className="muted">Wala pang approved stories sa filter na ito.</p>
        )}

        <div className="story-grid">
          {visible.map((story) => (
            <article key={story.id} className="story-card">
              <div className="story-meta">
                <span className="chip active">{story.category.replace("_", " ")}</span>
                <span className="muted">{story.display_name}</span>
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
                I relate · {story.relate_count}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
