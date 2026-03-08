// src/lib/apiFetch.ts

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccess(): Promise<boolean> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    isRefreshing = false;
    refreshPromise = null;

    return res.ok;
  })();

  return refreshPromise;
}

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (res.status !== 401) {
    return res;
  }

  // 401 → próbujemy refresh
  const refreshed = await refreshAccess();

  if (!refreshed) {
    // refresh 401 → twardy logout
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  // retry oryginalnego requestu
  return fetch(input, {
    ...init,
    credentials: "include",
  });
}
