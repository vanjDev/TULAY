import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CircleUserRound,
  KeyRound,
  Save,
  UserRound,
  UsersRound,
} from "lucide-react";
import { api } from "../api";
import {
  loadParticipantSession,
  saveParticipantSession,
  clearParticipantSession,
} from "../auth";
import ProfileForm from "../components/ProfileForm";
import { isProfileComplete } from "../registrationOptions";

export default function Settings() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => loadParticipantSession());
  const [username, setUsername] = useState(session?.participant?.username || "");
  const [displayName, setDisplayName] = useState(session?.participant?.full_name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const [accountError, setAccountError] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    if (!session?.access_token) {
      navigate("/login");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const me = await api.getMe(session.access_token);
        if (cancelled) return;
        const next = { ...session, participant: me };
        saveParticipantSession(next);
        setSession(next);
        setUsername(me.username || "");
        setDisplayName(me.full_name || "");
        if (!isProfileComplete(me)) {
          setActiveTab("profile");
        }
      } catch {
        if (!cancelled) {
          clearParticipantSession();
          navigate("/login");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session?.access_token) {
    return null;
  }

  const participant = session.participant;
  const hasPassword = Boolean(participant?.has_password);

  async function saveAccount(e) {
    e.preventDefault();
    setAccountError("");
    setAccountMessage("");

    if (newPassword && newPassword !== confirmPassword) {
      setAccountError("Passwords do not match.");
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setAccountError("Password must be at least 8 characters.");
      return;
    }

    setAccountLoading(true);
    try {
      const body = {
        full_name: displayName.trim(),
        username: username.trim() || null,
      };
      if (newPassword) {
        body.new_password = newPassword;
        if (hasPassword) body.current_password = currentPassword;
      }
      const auth = await api.updateSettings(session.access_token, body);
      saveParticipantSession(auth);
      setSession(auth);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setAccountMessage("Saved.");
    } catch (err) {
      setAccountError(err.message || "Unable to save");
    } finally {
      setAccountLoading(false);
    }
  }

  async function saveProfile(payload) {
    const auth = await api.updateProfile(session.access_token, payload);
    saveParticipantSession(auth);
    setSession(auth);
    setDisplayName(auth.participant.full_name || "");
    return auth;
  }

  return (
    <div className="page auth-page">
      <section className="auth-hero">
        <div className="section-label">Account</div>
        <h1>Settings</h1>
        <p className="lead">Username, password, Bridge profile.</p>
      </section>

      <div className="settings-tabs" role="tablist" aria-label="Settings sections">
        <button
          type="button"
          role="tab"
          className={`chip${activeTab === "account" ? " active" : ""}`}
          aria-selected={activeTab === "account"}
          onClick={() => setActiveTab("account")}
        >
          <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
          Account
        </button>
        <button
          type="button"
          role="tab"
          className={`chip${activeTab === "profile" ? " active" : ""}`}
          aria-selected={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          <UsersRound size={16} strokeWidth={2} aria-hidden="true" />
          Profile
          {!isProfileComplete(participant) && (
            <span className="settings-tab-dot" aria-label="Incomplete" />
          )}
        </button>
      </div>

      {activeTab === "account" && (
        <section className="panel auth-panel settings-panel">
          <h2 className="panel-title">Account</h2>
          <p className="muted">
            <strong>{participant?.email}</strong>
            {participant?.email_verified ? " · verified" : ""}
          </p>

          {accountError && <div className="alert error">{accountError}</div>}
          {accountMessage && <div className="alert success">{accountMessage}</div>}

          <form className="form" onSubmit={saveAccount}>
            <label>
              Display name
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                minLength={2}
                required
              />
            </label>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@handle (optional)"
                minLength={3}
                maxLength={40}
                pattern="[A-Za-z0-9_]*"
                title="Letters, numbers, and underscores only"
              />
            </label>

            <fieldset>
              <legend>
                <KeyRound size={16} strokeWidth={2} aria-hidden="true" className="legend-icon" />
                {hasPassword ? "Password" : "Set password"}
              </legend>
              <p className="field-help">
                {hasPassword
                  ? "Current password required to change."
                  : "Optional if you use Google sign-in."}
              </p>
              {hasPassword && (
                <label>
                  Current password
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>
              )}
              <div className="form-row">
                <label>
                  New password
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                  />
                </label>
                <label>
                  Confirm
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                  />
                </label>
              </div>
            </fieldset>

            <button className="btn btn-primary btn-block" type="submit" disabled={accountLoading}>
              <Save size={18} strokeWidth={2.2} aria-hidden="true" />
              {accountLoading ? "Saving…" : "Save"}
            </button>
          </form>

          <div className="settings-footer-links">
            <Link className="text-link" to="/bridge">
              Bridge
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {activeTab === "profile" && (
        <section className="panel bridge-registration hover-lift settings-panel">
          <div className="registration-kicker">
            <span className="section-label">
              <UserRound size={14} strokeWidth={2} aria-hidden="true" /> Bridge profile
            </span>
            <span className="registration-line" aria-hidden="true" />
          </div>
          <ProfileForm
            key={participant?.id || "profile"}
            initialParticipant={participant}
            compactHeader
            submitLabel="Save profile"
            submittingLabel="Saving…"
            description="Same as Join the Bridge."
            onSubmit={saveProfile}
          />
        </section>
      )}
    </div>
  );
}
