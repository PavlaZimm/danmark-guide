import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Replace with your Google Analytics Measurement ID
// Get it from https://analytics.google.com/
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with actual GA4 Measurement ID

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip if GA ID is not configured or in development
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX" || import.meta.env.DEV) {
      console.log("Google Analytics not configured or running in development mode");
      return;
    }

    // Initialize Google Analytics
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX" || import.meta.env.DEV) {
      return;
    }

    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
