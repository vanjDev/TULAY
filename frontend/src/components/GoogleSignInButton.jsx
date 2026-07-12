import { useEffect, useRef, useState } from "react";
import { api } from "../api";

let googleScriptPromise = null;

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.google), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
      document.head.appendChild(script);
    });
  }

  return googleScriptPromise;
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

    async function setupButton() {
      try {
        const config = await api.getParticipantAuthConfig();
        if (cancelled) return;

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
        if (cancelled || !buttonRef.current) return;

        // GIS returns an ID token here; the backend verifies it before starting the app session.
        google.accounts.id.initialize({
          client_id: config.google_client_id,
          callback: (response) => callbackRef.current?.(response),
          ux_mode: "popup",
          context,
          use_fedcm_for_button: true,
        });

        buttonRef.current.innerHTML = "";
        google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: buttonRef.current.offsetWidth ? String(buttonRef.current.offsetWidth) : "360",
          logo_alignment: "left",
        });

        setStatus({ loading: false, error: "", enabled: true, helper: "" });
      } catch (err) {
        if (!cancelled) {
          const message = err.message || "Google Sign-In is unavailable right now.";
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
              : "The Google sign-in button is shown here, but the service is currently unavailable.",
          });
        }
      }
    }

    setupButton();

    return () => {
      cancelled = true;
    };
  }, [context]);

  return (
    <div className="google-auth-block">
      {status.enabled ? (
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
