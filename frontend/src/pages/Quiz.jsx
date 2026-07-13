import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, HeartHandshake, RotateCcw } from "lucide-react";
import { api } from "../api";

const KEYS = ["a", "b", "c", "d"];
const OPTION_TONES = {
  a: "forest",
  b: "gold",
  c: "lilac",
  d: "sand",
};

export default function Quiz() {
  const [scenarios, setScenarios] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    if (!current || feedback || submitting) return;
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
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
    setSubmitting(false);
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
      <div className="page narrow choice-quiz-complete">
        <span className="pill">Quiz complete</span>
        <h1>Nice work reflecting.</h1>
        <p className="lead">
          You found <strong>{score}</strong> of {scenarios.length} best-choice matches.
        </p>
        <div className="choice-complete-score" aria-label={`${score} out of ${scenarios.length}`}>
          <strong>{score}</strong>
          <span>/ {scenarios.length}</span>
        </div>
        <p>
          Real life is nuanced. The goal isn&apos;t perfection—it&apos;s practicing pause,
          empathy, and action toward true inclusion.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={restart}>
            <RotateCcw size={17} aria-hidden="true" />
            Retake quiz
          </button>
          <Link className="btn btn-ghost" to="/pledge">
            Make a pledge
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
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
    <div className="page choice-quiz-page">
      <div className="choice-quiz-shell">
        <header className="choice-quiz-header">
          <div>
            <span className="section-label">Feature 4 · Practice Belonging</span>
            <h1>Choice Table</h1>
          </div>
          <div className="choice-quiz-progress">
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
            <span>{index + 1} / {scenarios.length}</span>
          </div>
        </header>

        <section className="choice-table" key={current.id} aria-labelledby="scenario-heading">
          <div className="choice-table-story">
            <p className="choice-scenario-label">Scenario {index + 1}</p>
            <h2 id="scenario-heading">{current.situation}</h2>
            <figure className="choice-scene">
              <img
                src="/art/v2/quiz.png"
                alt="A student reflecting while considering four symbolic choices"
              />
              <figcaption>Pause. Notice. Choose with care.</figcaption>
            </figure>
          </div>

          <div className="choice-table-actions">
            <p className="choice-instruction">What would you do?</p>
            <div className="choice-option-list" role="group" aria-label="Answer choices">
              {KEYS.map((key, optionIndex) => {
                const selected = feedback?.selected === key;
                const correct = feedback?.correct_option === key;
                const wrong = selected && feedback && !feedback.correct;
                const classes = [
                  "choice-option",
                  `choice-option-${OPTION_TONES[key]}`,
                  selected ? "is-selected" : "",
                  correct && feedback ? "is-correct" : "",
                  wrong ? "is-wrong" : "",
                ].filter(Boolean).join(" ");

                return (
                  <button
                    key={key}
                    type="button"
                    className={classes}
                    disabled={!!feedback || submitting}
                    aria-pressed={selected}
                    onClick={() => choose(key)}
                    style={{ "--choice-order": optionIndex }}
                  >
                    <span className="choice-key" aria-hidden="true">{key.toUpperCase()}</span>
                    <span className="choice-copy">{options[key]}</span>
                    <span className="choice-radio" aria-hidden="true">
                      {correct && feedback ? <CheckCircle2 size={21} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {feedback ? (
          <div className={`choice-feedback ${feedback.correct ? "is-positive" : "is-reflective"}`} role="status">
            <div className="choice-feedback-icon" aria-hidden="true">
              {feedback.correct ? <CheckCircle2 size={26} /> : <HeartHandshake size={26} />}
            </div>
            <div className="choice-feedback-copy">
              <strong>{feedback.correct ? "Solid choice." : "Let’s unpack this."}</strong>
              <p>{feedback.explanation}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={next}>
              {index + 1 >= scenarios.length ? "See results" : "Next scenario"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="choice-guidance">
            <HeartHandshake size={24} aria-hidden="true" />
            <div>
              <strong>There&apos;s no perfect answer.</strong>
              <p>Choose the response that shows respect, care, and courage.</p>
            </div>
            <span className="choice-quiz-score">Answered {answered} · Best matches {score}</span>
          </div>
        )}
      </div>
    </div>
  );
}
