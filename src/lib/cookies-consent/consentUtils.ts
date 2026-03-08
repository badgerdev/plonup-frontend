// src/lib/cookies-consent/utils.ts

import { CookieConsent } from "./consentTypes";
import {
  COOKIE_CONSENT_NAME,
  DEFAULT_CONSENT,
  COOKIE_CONSENT_MAX_AGE_DAYS,
} from "./consentConstants";

/**
 * 🍪 Parsuje document.cookie do obiektu
 */
function getRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/**
 * 🍪 Zwraca aktualną zgodę lub null (brak decyzji)
 */
export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = getRawCookie(COOKIE_CONSENT_NAME);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookieConsent;

    // minimalna walidacja struktury
    if (
      typeof parsed.essential !== "boolean" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * 🍪 Zapisuje zgodę do cookie
 */
export function setCookieConsent(consent: Omit<CookieConsent, "timestamp">) {
  if (typeof document === "undefined") return;

  const payload: CookieConsent = {
    ...consent,
    essential: true, // zawsze true
    timestamp: Date.now(),
  };

  const maxAgeSeconds = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;

  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(
    JSON.stringify(payload)
  )}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

/**
 * 🍪 Reset zgody (np. z ustawień cookies)
 */
export function clearCookieConsent() {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_CONSENT_NAME}=; path=/; max-age=0; samesite=lax`;
}

/**
 * ❓ Helper – czy user wyraził zgodę na dany typ
 */
export function hasConsent(type: "analytics" | "marketing"): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;

  return consent[type] === true;
}

/**
 * 🍪 Zwraca zgodę lub domyślną (do UI)
 */
export function getConsentOrDefault(): CookieConsent {
  return getCookieConsent() ?? DEFAULT_CONSENT;
}
