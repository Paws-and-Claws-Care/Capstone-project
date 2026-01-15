const API = "/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const AUTH_EVENT = "auth-changed";

function emitAuthChanged() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Register failed");
  return data;
}

export async function loginUser({ username, password }) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function fetchMe(token) {
  const res = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Not logged in");
  return data;
}

export function saveAuth({ token, user }) {
  if (token != null) {
    localStorage.setItem(TOKEN_KEY, String(token));
  }

  if (user != null) {
    if (typeof user === "string") {
      try {
        JSON.parse(user);
        localStorage.setItem(USER_KEY, user);
      } catch {
        localStorage.setItem(USER_KEY, JSON.stringify({ username: user }));
      }
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  emitAuthChanged();
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token || token === "undefined" || token === "null") return null;

  return token;
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw || raw === "undefined" || raw === "null") return null;

  try {
    const parsed = JSON.parse(raw);

    if (typeof parsed === "string") {
      if (!parsed || parsed === "undefined" || parsed === "null") return null;

      try {
        const parsedAgain = JSON.parse(parsed);
        return parsedAgain && typeof parsedAgain === "object"
          ? parsedAgain
          : null;
      } catch {
        return null;
      }
    }

    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  emitAuthChanged();
}

export const AUTH_CHANGED_EVENT = AUTH_EVENT;
