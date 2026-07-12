import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
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
        <h1>Sign in</h1>
        <p className="lead">Continue your T.U.L.A.Y. journey.</p>
      </section>

      <section className="auth-grid">
        <div className="panel auth-panel">
          <h2 className="panel-title">Welcome back</h2>
          {session?.participant && (
            <div className="alert success">
              Last signed in as <strong>{session.participant.full_name}</strong>
            </div>
          )}
          {error && <div className="alert error">{error}</div>}

          <div className="auth-social">
            <GoogleSignInButton onCredential={handleGoogleCredential} context="signin" />
          </div>

          <div className="auth-divider" role="separator">
            <span>or email</span>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Email
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
              <LogIn size={18} strokeWidth={2.2} aria-hidden="true" />
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <aside className="panel auth-side">
          <span className="badge">New here?</span>
          <h2 className="panel-title">Create account</h2>
          <p>Google or email — then finish your Bridge profile.</p>
          <Link className="btn btn-ghost" to="/register">
            <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
            Register
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </aside>
      </section>
    </div>
  );
}
