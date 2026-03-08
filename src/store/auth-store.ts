import { create } from "zustand";
import { User } from "@/lib/helpers/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  setUser: (user: User) => void;
  logoutUser: () => Promise<void>;
  setHydrated: (value: boolean) => void;
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
