import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Accommodation = lazy(() => import("./pages/Accommodation"));
const AccommodationDetail = lazy(() => import("./pages/AccommodationDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminArticles = lazy(() => import("./pages/admin/AdminArticles"));
const ArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));

// Admin route protection
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                      <Header />
                      <main id="main-content" className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/clanky" element={<Articles />} />
                          <Route path="/clanek/:slug" element={<ArticleDetail />} />
                          <Route path="/ubytovani" element={<Accommodation />} />
                          <Route path="/ubytovani/:slug" element={<AccommodationDetail />} />
                          <Route path="/o-dansku" element={<About />} />
                          <Route path="/kultura" element={<Articles />} />
                          <Route path="/cestovani" element={<Articles />} />
                          <Route path="/kontakt" element={<Contact />} />
                          <Route path="*" element={<NotFound />} />
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
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
