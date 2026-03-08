import { CookieConsent } from "./consentTypes";

export const COOKIE_CONSENT_NAME = "plonup_cookie_consent";

export const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
};

// ile dni trzymamy cookie (np. 12 miesięcy – standard UE)
export const COOKIE_CONSENT_MAX_AGE_DAYS = 365;
