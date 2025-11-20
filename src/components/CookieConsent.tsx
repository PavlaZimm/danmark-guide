import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
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
                <h3 className="mb-1 font-semibold">Používáme cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Tento web používá soubory cookies pro zajištění funkčnosti webu a
                  zlepšení uživatelského zážitku. Používáme pouze nezbytné technické
                  cookies pro fungování webu. Žádné analytické ani reklamní cookies
                  nepoužíváme.{" "}
                  <a
                    href="/kontakt"
                    className="underline hover:text-primary"
                  >
                    Více informací
                  </a>
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
                Odmítnout
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="w-full md:w-auto"
              >
                Přijmout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
