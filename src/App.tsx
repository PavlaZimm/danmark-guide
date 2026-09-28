import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";
import SiteAlternates from "./components/SiteAlternates";
import { LANG } from "./lib/site";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Accommodation = lazy(() => import("./pages/Accommodation"));
const Culture = lazy(() => import("./pages/Culture"));
const Hygge = lazy(() => import("./pages/Hygge"));
const Copenhagen = lazy(() => import("./pages/Copenhagen"));
const DanishLanguage = lazy(() => import("./pages/DanishLanguage"));
const DanishIslands = lazy(() => import("./pages/DanishIslands"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Author = lazy(() => import("./pages/Author"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Polish site (kastrup.pl)
const HomePl = lazy(() => import("./pages/pl/Home"));
const AboutPl = lazy(() => import("./pages/pl/About"));
const AccommodationPl = lazy(() => import("./pages/pl/Accommodation"));
const CulturePl = lazy(() => import("./pages/pl/Culture"));
const HyggePl = lazy(() => import("./pages/pl/Hygge"));
const CopenhagenPl = lazy(() => import("./pages/pl/Copenhagen"));
const DanishLanguagePl = lazy(() => import("./pages/pl/DanishLanguage"));
const DanishIslandsPl = lazy(() => import("./pages/pl/DanishIslands"));
const ContactPl = lazy(() => import("./pages/pl/Contact"));
const AuthorPl = lazy(() => import("./pages/pl/Author"));
const PrivacyPl = lazy(() => import("./pages/pl/Privacy"));
const NotFoundPl = lazy(() => import("./pages/pl/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminArticles = lazy(() => import("./pages/admin/AdminArticles"));
const ArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

const czechRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/clanky" element={<Articles />} />
    <Route path="/clanek/:slug" element={<ArticleDetail />} />
    <Route path="/ubytovani" element={<Accommodation />} />
    <Route path="/o-dansku" element={<About />} />
    <Route path="/kultura" element={<Culture />} />
    <Route path="/hygge" element={<Hygge />} />
    <Route path="/kodan" element={<Copenhagen />} />
    <Route path="/danstina" element={<DanishLanguage />} />
    <Route path="/danske-ostrovy" element={<DanishIslands />} />
    <Route path="/cestovani" element={<Articles />} />
    <Route path="/kontakt" element={<Contact />} />
    <Route path="/autorka" element={<Author />} />
    <Route path="/ochrana-soukromi" element={<Privacy />} />
    <Route path="*" element={<NotFound />} />
  </>
);

const polishRoutes = (
  <>
    <Route path="/" element={<HomePl />} />
    <Route path="/artykuly" element={<Articles />} />
    <Route path="/artykul/:slug" element={<ArticleDetail />} />
    <Route path="/noclegi" element={<AccommodationPl />} />
    <Route path="/co-zobaczyc-w-danii" element={<AboutPl />} />
    <Route path="/kultura-dunska" element={<CulturePl />} />
    <Route path="/hygge" element={<HyggePl />} />
    <Route path="/kopenhaga" element={<CopenhagenPl />} />
    <Route path="/jezyk-dunski" element={<DanishLanguagePl />} />
    <Route path="/wyspy-dunskie" element={<DanishIslandsPl />} />
    <Route path="/kontakt" element={<ContactPl />} />
    <Route path="/o-autorce" element={<AuthorPl />} />
    <Route path="/polityka-prywatnosci" element={<PrivacyPl />} />
    <Route path="*" element={<NotFoundPl />} />
  </>
);

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Admin Routes - without Header/Footer */}
                <Route path="/tajnedvere" element={<AdminLogin />} />
                <Route path="/tajnedvere/reset-password" element={<ResetPassword />} />
                <Route
                  path="/tajnedvere/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tajnedvere/articles"
                  element={
                    <ProtectedRoute>
                      <AdminArticles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tajnedvere/articles/new"
                  element={
                    <ProtectedRoute>
                      <ArticleEditor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tajnedvere/articles/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ArticleEditor />
                    </ProtectedRoute>
                  }
                />

                {/* Public Routes - with Header/Footer */}
                <Route
                  path="/*"
                  element={
                    <div className="flex min-h-screen flex-col">
                      <SiteAlternates />
                      <Header />
                      <main id="main-content" className="flex-1">
                        <Routes>
                          {LANG === "pl" ? polishRoutes : czechRoutes}
                        </Routes>
                      </main>
                      <Footer />
                      <ScrollToTop />
                      <BackToTop />
                    </div>
                  }
                />
              </Routes>
            </Suspense>
            <CookieConsent />
          </BrowserRouter>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
