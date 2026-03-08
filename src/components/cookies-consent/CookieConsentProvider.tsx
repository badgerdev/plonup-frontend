"use client";

import { useEffect, useState } from "react";
import CookieBanner from "./CookieBanner";
import CookieSettingsModal from "./CookieSettingsModal";

import {
  getCookieConsent,
  setCookieConsent,
} from "@/lib/cookies-consent/consentUtils";
import { CookieConsent } from "@/lib/cookies-consent/consentTypes";

export default function CookieConsentProvider() {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false); // 👈 NOWE

  // 🔹 przy starcie czytamy cookie RAZ
  useEffect(() => {
    const existing = getCookieConsent();
    setConsentState(existing);
    setReady(true); // 👈 KLUCZ
  }, []);

  // 🔔 globalny otwieracz z footera / mobile
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  // 🔹 zapis + aktualizacja stanu
  const updateConsent = (next: Omit<CookieConsent, "timestamp">) => {
    setCookieConsent(next);
    setConsentState({
      ...next,
      timestamp: Date.now(),
    });
  };

  // ⛔️ BLOKADA renderu zanim sprawdzimy cookies
  if (!ready) return null;

  return (
    <>
      {/* BANNER TYLKO JEŚLI BRAK ZGODY */}
      {consent === null && (
        <CookieBanner
          onAcceptEssential={() =>
            updateConsent({
              essential: true,
              analytics: false,
              marketing: false,
            })
          }
          onAcceptAll={() =>
            updateConsent({
              essential: true,
              analytics: true,
              marketing: true,
            })
          }
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {/* MODAL ZAWSZE */}
      <CookieSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={(data) => {
          updateConsent(data);
          setSettingsOpen(false);
        }}
        currentConsent={consent}
      />
    </>
  );
}
