import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import {
  loadParticipantSession,
  saveParticipantSession,
} from "../auth";
import GoogleSignInButton from "../components/GoogleSignInButton";
import ProfileForm from "../components/ProfileForm";
import { isProfileComplete } from "../registrationOptions";

const basicInitial = {
  full_name: "",
  email: "",
  password: "",
};

/**
 * Step 1: basic account (email/password or Google)
 * Step 2: same Bridge Circle profile form used on /bridge
 */
export default function Register() {
  const navigate = useNavigate();
  const existing = loadParticipantSession();
  const needsProfile =
    Boolean(existing?.access_token) && !isProfileComplete(existing?.participant);

  const [step, setStep] = useState(needsProfile ? "profile" : "account");
  const [form, setForm] = useState(basicInitial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(needsProfile ? existing : null);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function finishAuth(auth) {
    saveParticipantSession(auth);
    setSession(auth);
    if (isProfileComplete(auth.participant)) {
      navigate("/bridge");
      return;
    }
    setStep("profile");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await api.registerParticipant(form);
      finishAuth(auth);
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
      finishAuth(auth);
    } catch (err) {
      setError(err.message || "Unable to continue with Google");
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSubmit(payload) {
    const token = session?.access_token || loadParticipantSession()?.access_token;
    if (!token) {
      throw new Error("Please create your account first.");
    }
    const auth = await api.updateProfile(token, payload);
    saveParticipantSession(auth);
    setSession(auth);
    return auth;
  }

  if (step === "profile") {
    return (
      <div className="page auth-page">
        <section className="auth-hero">
          <div className="section-label">Almost there</div>
          <h1>Complete your Bridge Circle profile</h1>
          <p className="lead">
            Same details used when you Join the Bridge — interests, course, and a
            few optional identity fields so facilitators can welcome you well.
          </p>
        </section>

        <section className="panel bridge-registration hover-lift">
          <div className="registration-kicker">
            <span className="section-label">Step 2 of 2</span>
            <span className="registration-line" aria-hidden="true" />
          </div>
          {error && <div className="alert error">{error}</div>}
          <ProfileForm
            initialParticipant={session?.participant}
            submitLabel="Finish registration"
            submittingLabel="Saving profile..."
            onSubmit={async (payload) => {
              const auth = await handleProfileSubmit(payload);
              // Brief confirmation is shown by ProfileForm; then send them to Bridge.
              window.setTimeout(() => navigate("/bridge"), 1200);
              return auth;
            }}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="page auth-page">
      <section className="auth-hero">
        <div className="section-label">Registration</div>
        <h1>Create your Project T.U.L.A.Y. account</h1>
        <p className="lead">
          Start with the basics. Next you&apos;ll fill in the same Bridge Circle
          profile used when joining an activity.
        </p>
      </section>

      <section className="auth-grid">
        <div className="panel auth-panel">
          <h2 className="panel-title">Step 1 — Account basics</h2>
          <p className="muted">
            Start with Google in one tap, or register with email. Bridge profile comes next.
          </p>
          {error && <div className="alert error">{error}</div>}

          <div className="auth-social">
            <p className="auth-social-label">Quick sign-up</p>
            <GoogleSignInButton onCredential={handleGoogleCredential} context="signup" />
          </div>

          <div className="auth-divider" role="separator">
            <span>Or register with email</span>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={updateField}
                minLength={2}
                autoComplete="name"
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
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Continue to profile"}
            </button>
          </form>
        </div>

        <aside className="panel auth-side">
          <span className="badge">Already registered?</span>
          <h2 className="panel-title">Log in instead</h2>
          <p>
            If you already have an account, sign in and finish your Bridge profile
            from Settings if needed.
          </p>
          <Link className="btn btn-ghost" to="/login">
            Go to login
          </Link>
        </aside>
      </section>
    </div>
  );
}
