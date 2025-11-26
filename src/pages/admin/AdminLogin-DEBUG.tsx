import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // DEBUG: Zkontroluj env vars při načtení
    console.log("🔍 DEBUG 1: Environment variables check");
    console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("VITE_SUPABASE_PUBLISHABLE_KEY:", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.substring(0, 20) + "...");

    if (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY === "PLEASE_ADD_YOUR_FULL_ANON_KEY_HERE") {
      console.error("❌ KRITICKÁ CHYBA: Supabase PUBLISHABLE_KEY je stále placeholder!");
      toast.error("Konfigurace chybí! Zkontroluj .env soubor.");
      return;
    }

    // Rate limiting - blokovat po 5 neúspěšných pokusech
    if (isBlocked) {
      toast.error("Příliš mnoho neúspěšných pokusů. Zkuste to za 5 minut.");
      return;
    }

    if (loginAttempts >= 5) {
      setIsBlocked(true);
      toast.error("Příliš mnoho neúspěšných pokusů. Účet byl dočasně zablokován na 5 minut.");
      setTimeout(() => {
        setIsBlocked(false);
        setLoginAttempts(0);
      }, 5 * 60 * 1000); // 5 minut
      return;
    }

    setLoading(true);
    console.log("🔍 DEBUG 2: Starting login process...");
    console.log("Email:", email);

    try {
      // Přihlášení
      console.log("🔍 DEBUG 3: Calling supabase.auth.signInWithPassword...");

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("🔍 DEBUG 4: Response from Supabase:");
      console.log("Auth data:", authData);
      console.log("Auth error:", authError);

      if (authError) {
        console.error("❌ DEBUG 5: Auth error occurred:", authError.message);
        console.error("Error status:", authError.status);
        console.error("Error details:", authError);

        setLoginAttempts(prev => prev + 1);
        throw authError;
      }

      if (!authData.user) {
        console.error("❌ DEBUG 6: No user returned from auth");
        setLoginAttempts(prev => prev + 1);
        throw new Error("Nepodařilo se přihlásit");
      }

      console.log("✅ DEBUG 7: Auth successful! User:", authData.user.email);
      console.log("Session:", authData.session);

      // Zkontrolovat, jestli je admin
      console.log("🔍 DEBUG 8: Checking admin role in profiles table...");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      console.log("🔍 DEBUG 9: Profile data:", profile);
      console.log("Profile error:", profileError);

      if (profileError) {
        console.error("❌ DEBUG 10: Profile fetch error:", profileError);
        setLoginAttempts(prev => prev + 1);
        throw profileError;
      }

      console.log("🔍 DEBUG 11: User role:", profile?.role);

      if (profile?.role !== "admin") {
        console.error("❌ DEBUG 12: User is not admin! Role:", profile?.role);
        await supabase.auth.signOut();
        setLoginAttempts(prev => prev + 1);
        toast.error("Nemáte oprávnění k přístupu do administrace");
        return;
      }

      // Úspěšné přihlášení - reset počítadla
      console.log("✅ DEBUG 13: Login successful! Redirecting to dashboard...");
      setLoginAttempts(0);
      toast.success("Úspěšně přihlášen!");
      navigate("/tajnedvere/dashboard");

    } catch (error: any) {
      console.error("❌ DEBUG 14: Exception caught in handleLogin:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      const remainingAttempts = 5 - loginAttempts - 1;
      if (remainingAttempts > 0) {
        toast.error(`Špatné přihlašovací údaje. Zbývá ${remainingAttempts} ${remainingAttempts === 1 ? 'pokus' : remainingAttempts < 5 ? 'pokusy' : 'pokusů'}.`);
      } else {
        toast.error(error.message || "Nepodařilo se přihlásit");
      }
    } finally {
      console.log("🔍 DEBUG 15: Login process finished");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tajné dveře - Přihlášení | Kastrup.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Tajné dveře</h1>
            <p className="text-muted-foreground">Administrace Kastrup.cz</p>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border bg-card p-8 shadow-xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@kastrup.cz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Heslo</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading || isBlocked}>
                {loading ? "Přihlašuji..." : isBlocked ? "Zablokováno" : "Přihlásit se"}
              </Button>

              {loginAttempts > 0 && !isBlocked && (
                <div className="mt-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3">
                  <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
                    <Shield className="h-4 w-4" />
                    <span>Varování: {5 - loginAttempts} {(5 - loginAttempts) === 1 ? 'pokus zbývá' : 'pokusy zbývají'}</span>
                  </div>
                </div>
              )}

              {isBlocked && (
                <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3">
                  <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
                    <Lock className="h-4 w-4" />
                    <span>Účet dočasně zablokován kvůli bezpečnosti (5 minut)</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            🔒 Chráněno proti brute-force útokům. Maximálně 5 pokusů.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
