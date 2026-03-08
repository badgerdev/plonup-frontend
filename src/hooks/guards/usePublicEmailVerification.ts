"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const COOLDOWN_IN_SECONDS = 60;
const STORAGE_KEY = "public_email_verification_cooldown_until";

export function usePublicEmailVerification(email: string | null) {
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

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
  // RESEND (PUBLIC)
  // -------------------------------------------------------
  const resend = useCallback(async () => {
    if (!email) {
      toast.error("Nie znaleziono adresu e-mail.");
      return;
    }

    if (cooldown > 0 || isSending || limitReached) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/auth/public-resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // 🔒 BACKEND RATE LIMIT
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

      const data = await res.json();

      if (data.status === "sent") {
        toast.success("Nowy link został wysłany!");
        setCooldown(COOLDOWN_IN_SECONDS);
      } else if (data.status === "limit_reached") {
        setLimitReached(true);
        toast.warning("Osiągnięto dzienny limit wysyłek.");
      } else {
        toast.info("Jeśli konto istnieje, link został wysłany.");
        setCooldown(COOLDOWN_IN_SECONDS);
      }
    } catch (err) {
      console.error("❌ resend error:", err);
      toast.error("Błąd podczas wysyłania.");
    } finally {
      setIsSending(false);
    }
  }, [email, cooldown, isSending, limitReached]);

  return { cooldown, isSending, limitReached, resend };
}
