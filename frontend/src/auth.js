const AUTH_KEY = "tulayParticipantAuth";
const AUTH_EVENT = "tulayParticipantAuthChanged";

export function saveParticipantSession(payload) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: payload }));
}

export function loadParticipantSession() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function getParticipantAuthEventName() {
  return AUTH_EVENT;
}
