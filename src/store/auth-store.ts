import { create } from "zustand";
import { User } from "@/lib/helpers/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  setUser: (user: User) => void;
  logoutUser: () => Promise<void>;
  setHydrated: (value: boolean) => void;
  refreshUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hydrated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      hydrated: true,
    }),

  setHydrated: (value) => set({ hydrated: value }),

  refreshUser: async () => {
    try {
      const res = await fetch("/api/me", { method: "GET" });
      const data = await res.json();
      if (data.isAuthenticated) {
        set({ user: data.user, isAuthenticated: true, hydrated: true });
      }
    } catch (err) {
      console.error("Błąd odświeżania użytkownika:", err);
    }
  },

  logoutUser: async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.error("Błąd podczas wylogowania:", err);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        hydrated: true,
      });
    }
  },
}));
