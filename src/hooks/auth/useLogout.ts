"use client";

export function useLogout() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });

    window.location.href = "/";
  };

  return { handleLogout };
}
