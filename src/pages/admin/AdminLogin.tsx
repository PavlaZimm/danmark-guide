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
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔄 Sending password reset email to:', resetEmail);
      console.log('🔗 Redirect URL:', `${window.location.origin}/tajnedvere/reset-password`);

      const { data, error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/tajnedvere/reset-password`,
      });

      console.log('📧 Supabase response:', { data, error });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Password reset email sent successfully!');
      toast.success("Email s odkazem na reset hesla byl odeslán. Zkontrolujte schránku (i SPAM)!", {
        duration: 6000,
      });
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Nepodařilo se odeslat email. Zkontrolujte konzoli pro detaily.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      // Přihlášení
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setLoginAttempts(prev => prev + 1);
        throw authError;
      }

      if (!authData.user) {
        setLoginAttempts(prev => prev + 1);
        throw new Error("Nepodařilo se přihlásit");
      }

      // Zkontrolovat, jestli je admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        setLoginAttempts(prev => prev + 1);
        throw profileError;
      }

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setLoginAttempts(prev => prev + 1);
        toast.error("Nemáte oprávnění k přístupu do administrace");
        return;
      }

      // Úspěšné přihlášení - reset počítadla
      setLoginAttempts(0);
      toast.success("Úspěšně přihlášen!");
      navigate("/tajnedvere/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      const remainingAttempts = 5 - loginAttempts - 1;
      if (remainingAttempts > 0) {
        toast.error(`Špatné přihlašovací údaje. Zbývá ${remainingAttempts} ${remainingAttempts === 1 ? 'pokus' : remainingAttempts < 5 ? 'pokusy' : 'pokusů'}.`);
      } else {
        toast.error(error.message || "Nepodařilo se přihlásit");
      }
    } finally {
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
            {!showResetPassword ? (
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
            ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Zapomenuté heslo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Zadejte svůj email a odešleme vám odkaz na resetování hesla.
                </p>
                <Label htmlFor="reset-email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="admin@kastrup.cz"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="pl-10"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowResetPassword(false);
                    setResetEmail("");
                  }}
                  disabled={loading}
                >
                  Zpět
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Odesílám..." : "Odeslat email"}
                </Button>
              </div>
            </form>
            )}

            {!showResetPassword && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm text-muted-foreground hover:text-primary underline"
                >
                  Zapomenuté heslo?
                </button>
              </div>
            )}
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
