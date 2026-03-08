"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const { user, setUser, logoutUser, isAuthenticated, hydrated, setHydrated } =
    useAuthStore();

  const [loading, setLoading] = useState(!hydrated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { method: "GET" });
        const data = await res.json();

        if (data.isAuthenticated) {
          setUser(data.user);
        } else {
          logoutUser();
        }
      } catch (err) {
        console.error("Błąd pobierania użytkownika:", err);
        logoutUser();
      } finally {
        setLoading(false);
        setHydrated(true);
      }
    };

    if (!hydrated) {
      fetchUser();
    }
  }, [hydrated, setUser, setHydrated, logoutUser]);

  return {
    user,
    isAuthenticated,
    loading,
  };
}
