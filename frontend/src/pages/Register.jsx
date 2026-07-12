import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
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
          <div className="section-label">Step 2 of 2</div>
          <h1>Bridge profile</h1>
          <p className="lead">Course, interests, and a few details to join a circle.</p>
        </section>

        <section className="panel bridge-registration hover-lift">
          {error && <div className="alert error">{error}</div>}
          <ProfileForm
            initialParticipant={session?.participant}
            compactHeader
            title="Your profile"
            description="Same form as Join the Bridge."
            submitLabel="Finish"
            submittingLabel="Saving…"
            onSubmit={async (payload) => {
              const auth = await handleProfileSubmit(payload);
              window.setTimeout(() => navigate("/bridge"), 1000);
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
        <div className="section-label">Step 1 of 2</div>
        <h1>Create account</h1>
        <p className="lead">Google or email. Profile next.</p>
      </section>

      <section className="auth-grid">
        <div className="panel auth-panel">
          <h2 className="panel-title">Account basics</h2>
          {error && <div className="alert error">{error}</div>}

          <div className="auth-social">
            <GoogleSignInButton onCredential={handleGoogleCredential} context="signup" />
          </div>

          <div className="auth-divider" role="separator">
            <span>or email</span>
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
                autoComplete="new-password"
                value={form.password}
                onChange={updateField}
                minLength={8}
                required
              />
            </label>
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              <UserPlus size={18} strokeWidth={2.2} aria-hidden="true" />
              {loading ? "Creating…" : "Continue"}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </form>
        </div>

        <aside className="panel auth-side">
          <span className="badge">Have an account?</span>
          <h2 className="panel-title">Sign in</h2>
          <p>Finish your Bridge profile anytime in Settings.</p>
          <Link className="btn btn-ghost" to="/login">
            <LogIn size={18} strokeWidth={2} aria-hidden="true" />
            Sign in
          </Link>
        </aside>
      </section>
    </div>
  );
}
