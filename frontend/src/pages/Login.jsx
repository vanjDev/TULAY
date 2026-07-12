import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { loadParticipantSession, saveParticipantSession } from "../auth";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { isProfileComplete } from "../registrationOptions";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const session = loadParticipantSession();

  function updateField(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function afterAuth(auth) {
    saveParticipantSession(auth);
    if (!isProfileComplete(auth.participant)) {
      navigate("/register");
      return;
    }
    navigate("/bridge");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await api.loginParticipant(form);
      afterAuth(auth);
    } catch (err) {
      setError(err.message || "Unable to log in");
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
      afterAuth(auth);
    } catch (err) {
      setError(err.message || "Unable to log in with Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page auth-page">
      <section className="auth-hero">
        <div className="section-label">Account</div>
        <h1>Log in to your Bridge Circle account</h1>
        <p className="lead">
          Access your participant profile and stay inside the T.U.L.A.Y. journey without
          leaving the website.
        </p>
      </section>

      <section className="auth-grid">
        <div className="panel auth-panel">
          <h2 className="panel-title">Welcome back</h2>
          <p className="muted">
            Use the email and password you created during registration.
          </p>
          {session?.participant && (
            <div className="alert success">
              Signed in most recently as <strong>{session.participant.full_name}</strong>.
            </div>
          )}
          {error && <div className="alert error">{error}</div>}
          <GoogleSignInButton onCredential={handleGoogleCredential} context="signin" />
          <div className="auth-divider" role="separator">
            <span>Or continue with email</span>
          </div>
          <form className="form" onSubmit={handleSubmit}>
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
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={updateField}
                minLength={8}
                required
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <aside className="panel auth-side">
          <span className="badge">New here?</span>
          <h2 className="panel-title">Create your account</h2>
          <p>
            Register with email or Google, then complete the same Bridge Circle profile
            used when joining an activity.
          </p>
          <Link className="btn btn-ghost" to="/register">
            Create an account
          </Link>
        </aside>
      </section>
    </div>
  );
}
