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

  if (loading) return <div className="page"><p>Loading scenarios…</p></div>;
  if (error) return <div className="page"><p className="alert error">{error}</p></div>;
  if (!scenarios.length) return <div className="page"><p>No scenarios yet.</p></div>;

  if (done) {
    return (
      <div className="page narrow">
        <header className="page-header">
          <span className="pill">Quiz complete</span>
          <h1>Nice work reflecting</h1>
          <p className="lead">
            Score: <strong>{score}</strong> / {scenarios.length} best-choice matches
          </p>
        </header>
        <div className="panel">
          <p>
            Remember: real life is nuanced. The goal isn’t perfection — it’s practicing
            pause, empathy, and action.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={restart}>
              Retake
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
    <div className="page narrow">
      <header className="page-header">
        <span className="pill">Scenario quiz</span>
        <h1>What would you do?</h1>
        <p className="lead">
          Scenario {index + 1} of {scenarios.length} · Progress {answered}/{scenarios.length}
        </p>
      </header>

      <section className="panel quiz-card">
        <p className="situation">{current.situation}</p>
        <div className="option-list">
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
                {options[key]}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.correct ? "ok" : "nope"}`}>
            <strong>{feedback.correct ? "Solid choice." : "Let's unpack this."}</strong>
            <p>{feedback.explanation}</p>
            <button type="button" className="btn btn-primary" onClick={next}>
              {index + 1 >= scenarios.length ? "See results" : "Next scenario"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
