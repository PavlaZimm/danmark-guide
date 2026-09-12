export const ANALYTICS_CONSENT_KEY = "cookie-consent";
export const COOKIE_SETTINGS_EVENT = "kastrup:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "kastrup:analytics-consent-changed";

const GOOGLE_ANALYTICS_ID = "G-L50ERSBZ0Z";
const GA_DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}`;

export type AnalyticsConsent = "accepted" | "declined";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    "ga-disable-G-L50ERSBZ0Z": boolean;
  }
}

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedConsent === "accepted" || storedConsent === "declined"
    ? storedConsent
    : null;
};

export const loadGoogleAnalytics = () => {
  window[GA_DISABLE_KEY] = false;

  if (document.getElementById("google-analytics-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_ID);

  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);
};

const removeAnalyticsCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  });
};

export const setAnalyticsConsent = (consent: AnalyticsConsent) => {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  window.dispatchEvent(new CustomEvent<AnalyticsConsent>(CONSENT_CHANGED_EVENT, { detail: consent }));

  if (consent === "accepted") {
    loadGoogleAnalytics();
    return;
  }

  window[GA_DISABLE_KEY] = true;
  removeAnalyticsCookies();
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
};
