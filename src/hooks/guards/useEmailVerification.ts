"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const COOLDOWN_IN_SECONDS = 60;
const STORAGE_KEY = "email_verification_cooldown_until";

export function useEmailVerification() {
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const until = Number(stored);
    const diff = Math.ceil((until - Date.now()) / 1000);

    if (diff > 0) {
      setCooldown(diff);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // -------------------------------------------------------
  // TIMER
  // -------------------------------------------------------
  useEffect(() => {
    if (cooldown <= 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  // -------------------------------------------------------
  // RESEND (LOGGED IN)
  // -------------------------------------------------------
  const resendVerification = useCallback(async () => {
    if (cooldown > 0 || isSending) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
      });

      // 🔒 BACKEND RATE LIMIT / COOLDOWN
      if (res.status === 429) {
        let message = "";

        try {
          const data = await res.json();
          message = data?.detail || data?.message || JSON.stringify(data);
        } catch {
          message = "";
        }

        // 🚫 LIMIT DZIENNY
        if (message.toLowerCase().includes("limit")) {
          toast.warning("Osiągnięto dzienny limit wysyłek.");
          return;
        }

        // ⏳ COOLDOWN
        toast.warning("Poczekaj chwilę przed kolejną próbą.");
        const until = Date.now() + COOLDOWN_IN_SECONDS * 1000;
        localStorage.setItem(STORAGE_KEY, String(until));
        setCooldown(COOLDOWN_IN_SECONDS);
        return;
      }

      if (res.status === 429) {
        const data = await res.json();
        const message = data.detail || "";

        // 🚫 LIMIT DZIENNY
        if (message.toLowerCase().includes("limit")) {
          toast.warning("Osiągnięto dzienny limit wysyłek.");
          return;
        }

        // ⏳ COOLDOWN
        toast.warning("Poczekaj chwilę przed kolejną próbą.");
        const until = Date.now() + COOLDOWN_IN_SECONDS * 1000;
        localStorage.setItem(STORAGE_KEY, String(until));
        setCooldown(COOLDOWN_IN_SECONDS);
        return;
      }

      if (!res.ok) {
        toast.error("Nie udało się wysłać ponownie.");
        return;
      }

      toast.success("Nowy link został wysłany na Twój adres e-mail.");
      setCooldown(COOLDOWN_IN_SECONDS);
    } catch (err) {
      console.error("❌ resend-verification error:", err);
      toast.error("Błąd podczas ponownego wysłania.");
    } finally {
      setIsSending(false);
    }
  }, [cooldown, isSending]);

  return {
    cooldown,
    isSending,
    resendVerification,
  };
}
