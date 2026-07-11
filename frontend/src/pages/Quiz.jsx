import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const KEYS = ["a", "b", "c", "d"];

export default function Quiz() {
  const [scenarios, setScenarios] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    api
      .getQuiz()
      .then(setScenarios)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const current = scenarios[index];
  const progress = scenarios.length
    ? Math.round(((index + (feedback ? 1 : 0)) / scenarios.length) * 100)
    : 0;

  async function choose(selected) {
    if (!current || feedback) return;
    try {
      const res = await api.answerQuiz({
        scenario_id: current.id,
        selected,
      });
      setFeedback(res);
      setAnswered((n) => n + 1);
      if (res.correct) setScore((s) => s + 1);
    } catch (e) {
      setError(e.message);
    }
  }

  function next() {
    if (index + 1 >= scenarios.length) {
      setDone(true);
      setFeedback(null);
      return;
    }
    setIndex((i) => i + 1);
    setFeedback(null);
  }

  function restart() {
    setIndex(0);
    setFeedback(null);
    setScore(0);
    setAnswered(0);
    setDone(false);
  }

  if (loading) {
    return (
      <div className="page">
        <div className="skeleton-grid quiz-skeleton" aria-busy="true" aria-label="Loading quiz">
          <div className="skeleton-card tall" />
          <div className="skeleton-card tall" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page">
        <p className="alert error" role="alert">{error}</p>
      </div>
    );
  }
  if (!scenarios.length) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="muted">No scenarios yet.</p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="page narrow">
        <div className="page-hero-band">
          <header className="page-header">
            <span className="pill">Quiz complete</span>
            <h1>Nice work reflecting</h1>
            <p className="lead">
              Score: <strong>{score}</strong> / {scenarios.length} best-choice matches
            </p>
          </header>
        </div>
        <div className="panel hover-lift" style={{ textAlign: "center" }}>
          <p>
            Real life is nuanced. The goal isn&apos;t perfection — it&apos;s practicing
            pause, empathy, and action toward true inclusion.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-primary" onClick={restart}>
              Retake quiz
            </button>
            <Link className="btn btn-ghost" to="/pledge">
              Make a pledge
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const options = {
    a: current.option_a,
    b: current.option_b,
    c: current.option_c,
    d: current.option_d,
  };

  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">Feature 4 · Practice Belonging</span>
          <h1>Scenario quiz</h1>
          <p className="lead">
            Practice what you would do — for students building safer campus habits
          </p>
        </header>
        <img
          src="/art/quiz-classroom.jpg"
          alt="Diverse students collaborating respectfully"
          className="page-hero-art"
        />
      </div>

      <div className="quiz-layout">
        <section className="panel quiz-card">
          <div className="quiz-progress">
            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Quiz progress"
            >
              <div
                className="progress-fill"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            <span className="progress-label">
              {index + 1} / {scenarios.length}
            </span>
          </div>

          <p className="situation">
            <strong>Scenario:</strong> {current.situation}
          </p>

          <div className="option-list" role="group" aria-label="Answer choices">
            {KEYS.map((key) => {
              let cls = "option-btn";
              if (feedback) {
                if (key === feedback.correct_option) cls += " correct";
                else if (key === feedback.selected && !feedback.correct) cls += " wrong";
              }
              return (
                <button
                  key={key}
                  type="button"
                  className={cls}
                  disabled={!!feedback}
                  onClick={() => choose(key)}
                >
                  <span className="opt-key">{key.toUpperCase()}</span>
                  <span>{options[key]}</span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={`feedback ${feedback.correct ? "ok" : "nope"}`}
              role="status"
            >
              <strong>
                {feedback.correct ? "Solid choice." : "Let's unpack this."}
              </strong>
              <p>{feedback.explanation}</p>
              <button type="button" className="btn btn-primary" onClick={next}>
                {index + 1 >= scenarios.length ? "See results" : "Next scenario"}
              </button>
            </div>
          )}
        </section>

        <aside className="quiz-art quiz-art-img">
          <img
            src="/art/quiz-classroom.jpg"
            alt=""
            className="page-art"
            aria-hidden="true"
          />
          <p className="art-caption">Pause. Choose inclusion.</p>
        </aside>
      </div>

      <p className="muted quiz-meta">
        Answered: {answered} · Best matches: {score}
      </p>
    </div>
  );
}
