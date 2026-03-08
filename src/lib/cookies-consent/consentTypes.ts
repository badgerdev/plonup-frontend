export type CookieConsent = {
  essential: true; // zawsze true (cookies techniczne)
  analytics: boolean; // GA / PostHog
  marketing: boolean; // FB / Ads
  timestamp: number; // kiedy user wyraził zgodę (RODO)
};
