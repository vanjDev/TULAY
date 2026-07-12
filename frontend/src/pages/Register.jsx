import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { saveParticipantSession } from "../auth";
import GoogleSignInButton from "../components/GoogleSignInButton";

const initialState = {
  full_name: "",
  email: "",
  password: "",
  basic_info: "",
  interest_1: "",
  interest_2: "",
  interest_3: "",
  gender_identity: "",
  sexual_orientation: "",
  motivation: "",
};

const optionalChoices = [
  "Prefer not to say",
  "Self-describe below",
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await api.registerParticipant(form);
      saveParticipantSession(auth);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleCredential(response) {
    setLoading(true);
    setError("");

    try {
      const auth = await api.loginParticipantWithGoogle({
        credential: response.credential,
      });
      saveParticipantSession(auth);
      navigate("/bridge");
    } catch (err) {
      setError(err.message || "Unable to continue with Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page auth-page">
      <section className="auth-hero">
        <div className="section-label">Registration</div>
        <h1>Choose your path into Project T.U.L.A.Y.</h1>
        <p className="lead">
          Sign up directly on the site with your interests, optional identity details,
          and the reason you want to join the bridge-building experience.
        </p>
      </section>

      <section className="auth-grid auth-grid-wide">
        <div className="panel auth-panel">
          <h2 className="panel-title">Create your account</h2>
          <p className="muted">
            Fields on identity are optional. Self-describe if that fits you better.
          </p>
          {error && <div className="alert error">{error}</div>}
          <GoogleSignInButton onCredential={handleGoogleCredential} context="signup" />
          <div className="auth-divider">
            <span>Or create an account with email</span>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Full name
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={updateField}
                  minLength={2}
                  required
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateField}
                  minLength={8}
                  required
                />
              </label>
              <label>
                Basic info (optional)
                <input
                  type="text"
                  name="basic_info"
                  value={form.basic_info}
                  onChange={updateField}
                  placeholder="Course, year level, pronouns, or leave blank"
                />
              </label>
            </div>

            <div className="auth-interest-grid">
              <label>
                Top interest #1
                <input
                  type="text"
                  name="interest_1"
                  value={form.interest_1}
                  onChange={updateField}
                  placeholder="Gaming, music, books..."
                  required
                />
              </label>
              <label>
                Top interest #2
                <input
                  type="text"
                  name="interest_2"
                  value={form.interest_2}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Top interest #3
                <input
                  type="text"
                  name="interest_3"
                  value={form.interest_3}
                  onChange={updateField}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Gender identity (optional)
                <input
                  type="text"
                  name="gender_identity"
                  list="gender-identity-options"
                  value={form.gender_identity}
                  onChange={updateField}
                  placeholder="Choose or self-describe"
                />
                <datalist id="gender-identity-options">
                  {optionalChoices.map((choice) => (
                    <option key={choice} value={choice} />
                  ))}
                </datalist>
              </label>
              <label>
                Sexual orientation (optional)
                <input
                  type="text"
                  name="sexual_orientation"
                  list="sexual-orientation-options"
                  value={form.sexual_orientation}
                  onChange={updateField}
                  placeholder="Choose or self-describe"
                />
                <datalist id="sexual-orientation-options">
                  {optionalChoices.map((choice) => (
                    <option key={choice} value={choice} />
                  ))}
                </datalist>
              </label>
            </div>

            <label>
              What motivated you to join?
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={updateField}
                rows={5}
                placeholder="Tell us what brought you here and what you hope to experience."
                required
              />
            </label>

            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <aside className="panel auth-side">
          <span className="badge">Already registered?</span>
          <h2 className="panel-title">Log in instead</h2>
          <p>
            If you already have a participant account, head straight to the login page
            and continue from there.
          </p>
          <Link className="btn btn-ghost" to="/login">
            Go to login
          </Link>
        </aside>
      </section>
    </div>
  );
}
