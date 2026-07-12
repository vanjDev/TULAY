import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      setAccountError("New password and confirmation do not match.");
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setAccountError("New password must be at least 8 characters.");
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
      setAccountMessage("Account settings saved.");
    } catch (err) {
      setAccountError(err.message || "Unable to save settings");
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
        <p className="lead">
          Manage your username, password, and Bridge Circle profile in one place.
        </p>
      </section>

      <div className="settings-tabs" role="tablist" aria-label="Settings sections">
        <button
          type="button"
          role="tab"
          className={`chip${activeTab === "account" ? " active" : ""}`}
          aria-selected={activeTab === "account"}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          type="button"
          role="tab"
          className={`chip${activeTab === "profile" ? " active" : ""}`}
          aria-selected={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          Bridge profile
          {!isProfileComplete(participant) && (
            <span className="settings-tab-dot" aria-label="Incomplete" />
          )}
        </button>
      </div>

      {activeTab === "account" && (
        <section className="panel auth-panel settings-panel">
          <h2 className="panel-title">Account details</h2>
          <p className="muted">
            Signed in as <strong>{participant?.email}</strong>
            {participant?.email_verified ? " (verified)" : ""}.
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
                placeholder="optional public handle"
                minLength={3}
                maxLength={40}
                pattern="[A-Za-z0-9_]*"
                title="Letters, numbers, and underscores only"
              />
            </label>
            <p className="field-help">
              Email is managed by your sign-in method and cannot be changed here.
            </p>

            <fieldset>
              <legend>{hasPassword ? "Change password" : "Set a password"}</legend>
              <p className="field-help">
                {hasPassword
                  ? "Enter your current password to set a new one."
                  : "You signed in with Google. Optionally add a password for email login."}
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
                  Confirm new password
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
              {accountLoading ? "Saving..." : "Save account settings"}
            </button>
          </form>

          <div className="settings-footer-links">
            <Link className="text-link" to="/bridge">
              Go to Bridge →
            </Link>
          </div>
        </section>
      )}

      {activeTab === "profile" && (
        <section className="panel bridge-registration hover-lift settings-panel">
          <div className="registration-kicker">
            <span className="section-label">Bridge Circle profile</span>
            <span className="registration-line" aria-hidden="true" />
          </div>
          <ProfileForm
            key={participant?.id || "profile"}
            initialParticipant={participant}
            submitLabel="Save Bridge profile"
            submittingLabel="Saving..."
            description="Same form as Join the Bridge — update anytime from Settings."
            onSubmit={saveProfile}
          />
        </section>
      )}
    </div>
  );
}
