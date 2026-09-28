import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  COOKIE_SETTINGS_EVENT,
  getAnalyticsConsent,
  loadGoogleAnalytics,
  setAnalyticsConsent,
} from "@/lib/analytics";
import { ui } from "@/lib/i18n";
import { pathTo } from "@/lib/site";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getAnalyticsConsent();
    if (consent === "accepted") {
      loadGoogleAnalytics();
    } else if (!consent) {
      const timer = window.setTimeout(() => setShowBanner(true), 1000);
      return () => window.clearTimeout(timer);
    }

    const openSettings = () => setShowBanner(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const acceptCookies = () => {
    setAnalyticsConsent("accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    setAnalyticsConsent("declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xl">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Content */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-semibold">{ui.cookies.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {ui.cookies.text}{" "}
                  <Link
                    to={pathTo("privacy")}
                    className="underline hover:text-primary"
                  >
                    {ui.cookies.more}
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={declineCookies}
                className="w-full md:w-auto"
              >
                {ui.cookies.decline}
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="w-full md:w-auto"
              >
                {ui.cookies.accept}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
