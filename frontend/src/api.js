const API_BASE = "";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { detail: text };
    }
  }

  if (!res.ok) {
    const detail = data?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((d) => d.msg || JSON.stringify(d)).join(", ")
          : "Request failed";
    throw new Error(message);
  }

  return data;
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  getParticipantAuthConfig: () => request("/api/participants/auth-config"),
  registerParticipant: (body) =>
    request("/api/participants/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  loginParticipant: (body) =>
    request("/api/participants/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  loginParticipantWithGoogle: (body) =>
    request("/api/participants/google", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getMe: (token) =>
    request("/api/participants/me", {
      headers: authHeaders(token),
    }),
  updateProfile: (token, body) =>
    request("/api/participants/me/profile", {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(body),
    }),
  updateSettings: (token, body) =>
    request("/api/participants/me/settings", {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify(body),
    }),
  getStories: () => request("/api/stories"),
  submitStory: (body) =>
    request("/api/stories", { method: "POST", body: JSON.stringify(body) }),
  relateStory: (id) => request(`/api/stories/${id}/relate`, { method: "POST" }),
  getPledges: () => request("/api/pledges"),
  createPledge: (body) =>
    request("/api/pledges", { method: "POST", body: JSON.stringify(body) }),
  getQuiz: () => request("/api/quiz/scenarios"),
  answerQuiz: (body) =>
    request("/api/quiz/answer", { method: "POST", body: JSON.stringify(body) }),
  adminLogin: (password) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  adminStats: (token) =>
    request("/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  adminStories: (token, status) =>
    request(`/api/admin/stories${status ? `?status=${status}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  approveStory: (token, id) =>
    request(`/api/admin/stories/${id}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
  rejectStory: (token, id) =>
    request(`/api/admin/stories/${id}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
};
