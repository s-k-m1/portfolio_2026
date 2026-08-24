"use client";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"
).replace(/\/$/, "");

export const TOKEN_KEY = "skm_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  role: string;
  avatar: string | null;
}

export function isAdmin(u: AdminUser | null): boolean {
  return Boolean(u && (u.is_superuser || u.is_staff));
}

async function parse(res: Response) {
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

export async function adminFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...init.headers,
    },
  });
  const { ok, status, data } = await parse(res);
  if (!ok) {
    const message =
      (data && typeof data === "object" && "detail" in data
        ? String((data as Record<string, unknown>).detail)
        : null) ||
      (data && typeof data === "object" ? JSON.stringify(data) : String(data)) ||
      `Request failed (${status})`;
    throw new Error(message);
  }
  return data as T;
}

export async function login(
  username: string,
  password: string,
): Promise<AdminUser> {
  const res = await adminFetch<{ token: string }>("/auth/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(res.token);
  return getMe();
}

export async function getMe(): Promise<AdminUser> {
  return adminFetch<AdminUser>("/auth/me/");
}

export async function logout(): Promise<void> {
  try {
    await adminFetch("/auth/logout/", { method: "POST" });
  } catch {
    // ignore — token is cleared locally regardless
  } finally {
    clearToken();
  }
}
