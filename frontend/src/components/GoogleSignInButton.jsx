import { useEffect, useRef, useState } from "react";
import { api } from "../api";

let googleScriptPromise = null;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_SCRIPT_TIMEOUT_MS = 7000;
const GOOGLE_SETUP_TIMEOUT_MS = 10000;
const GOOGLE_SETUP_TIMEOUT_MESSAGE =
  "Google Sign-In took too long to load. Check your connection, Google Cloud origin settings, or try again.";

function withTimeout(promise, timeoutMs, message) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => {
        window.clearTimeout(timeoutId);
      });
  });
}

function waitForGoogleIdentity(timeoutMs = GOOGLE_SCRIPT_TIMEOUT_MS) {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    function check() {
      if (window.google?.accounts?.id) {
        resolve(window.google);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error("Google Identity Services did not finish loading"));
        return;
      }

      window.setTimeout(check, 100);
    }

    check();
  });
}

function loadGoogleScript() {
  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      let script = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);

      if (!script) {
        script = document.createElement("script");
        script.src = GOOGLE_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
        document.head.appendChild(script);
      }

      waitForGoogleIdentity().then(resolve).catch(reject);
    }).catch((error) => {
      googleScriptPromise = null;
      throw error;
    });
  }

  return googleScriptPromise;
}

function getGoogleButtonWidth(element) {
  const measuredWidth = Math.floor(element.getBoundingClientRect().width);
  if (!Number.isFinite(measuredWidth) || measuredWidth <= 0) {
    return 360;
  }
  return Math.min(Math.max(measuredWidth, 240), 400);
}

export default function GoogleSignInButton({ onCredential, context = "signin" }) {
  const buttonRef = useRef(null);
  const callbackRef = useRef(onCredential);
  const [status, setStatus] = useState({
    loading: true,
    error: "",
    enabled: false,
    helper: "",
  });

  callbackRef.current = onCredential;

  useEffect(() => {
    let cancelled = false;
    let setupTimedOut = false;

    async function setupButton() {
      try {
        setStatus({ loading: true, error: "", enabled: false, helper: "" });
        await withTimeout(setupGoogleButton(), GOOGLE_SETUP_TIMEOUT_MS, GOOGLE_SETUP_TIMEOUT_MESSAGE);
      } catch (err) {
        if (!cancelled) {
          const message = err.message || "Google Sign-In is unavailable right now.";
          setupTimedOut = message === GOOGLE_SETUP_TIMEOUT_MESSAGE;
          const silentBackendErrors = new Set([
            "Not found",
            "Google Sign-In is not configured",
          ]);
          const silentlyUnavailable = silentBackendErrors.has(message);
          setStatus({
            loading: false,
            error: silentlyUnavailable ? "" : "Google Sign-In is unavailable right now.",
            enabled: false,
            helper: silentlyUnavailable
              ? "Google Sign-In is not connected for this deployment yet."
              : message === GOOGLE_SETUP_TIMEOUT_MESSAGE
                ? GOOGLE_SETUP_TIMEOUT_MESSAGE
                : "The Google sign-in button is shown here, but the service is currently unavailable.",
          });
        }
      }
    }

    async function setupGoogleButton() {
      const config = await api.getParticipantAuthConfig();
      if (cancelled || setupTimedOut) return;

      if (!config.google_enabled || !config.google_client_id) {
        setStatus({
          loading: false,
          error: "",
          enabled: false,
          helper: "Google Sign-In is not configured in this environment yet.",
        });
        return;
      }

      const google = await loadGoogleScript();
      if (cancelled || setupTimedOut || !buttonRef.current) return;

      // GIS returns an ID token here; the backend verifies it before starting the app session.
      google.accounts.id.initialize({
        client_id: config.google_client_id,
        callback: (response) => {
          if (!response?.credential) {
            setStatus({
              loading: false,
              error: "Google did not return a usable sign-in credential.",
              enabled: true,
              helper: "",
            });
            return;
          }
          callbackRef.current?.(response);
        },
        ux_mode: "popup",
        context,
      });

      buttonRef.current.innerHTML = "";
      google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: getGoogleButtonWidth(buttonRef.current),
        logo_alignment: "left",
      });

      setStatus({ loading: false, error: "", enabled: true, helper: "" });
    }

    setupButton();

    return () => {
      cancelled = true;
    };
  }, [context]);

  return (
    <div className="google-auth-block">
      {status.loading || status.enabled ? (
        <div ref={buttonRef} className="google-signin-slot" />
      ) : (
        <button type="button" className="btn btn-ghost btn-block google-fallback-button" disabled>
          <span className="google-mark" aria-hidden="true">
            G
          </span>
          Continue with Google
        </button>
      )}
      {status.loading && <p className="muted auth-inline-note">Loading Google Sign-In...</p>}
      {!status.loading && status.helper && <p className="muted auth-inline-note">{status.helper}</p>}
      {status.error && <div className="alert error">{status.error}</div>}
    </div>
  );
}
