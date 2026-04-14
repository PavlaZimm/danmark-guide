import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a recovery token in URL hash
    const hash = window.location.hash;

    if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
      setHasToken(true);

      // Supabase automatically parses the hash and logs in the user
      // We just need to wait a moment for it to process
      setTimeout(() => {
        supabase.auth.getSession();
      }, 500);
    } else {
      toast.error("Chybějící recovery token. Požádejte o nový reset hesla.");
      setTimeout(() => navigate('/tajnedvere'), 3000);
    }
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (newPassword.length < 8) {
      toast.error("Heslo musí mít alespoň 8 znaků");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Hesla se neshodují");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast.success("Heslo bylo úspěšně změněno!");

      // Sign out and redirect to login after 3 seconds
      setTimeout(async () => {
        await supabase.auth.signOut();
        navigate('/tajnedvere');
      }, 3000);

    } catch (error: unknown) {
      toast.error(error.message || "Nepodařilo se změnit heslo");
    } finally {
      setLoading(false);
    }
  };

  if (!hasToken) {
    return (
      <>
        <Helmet>
          <title>Reset hesla | Kastrup.cz</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
          <div className="text-center">
            <Lock className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Chybějící token</h1>
            <p className="text-muted-foreground">Přesměrovávám na přihlášení...</p>
          </div>
        </div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Heslo změněno | Kastrup.cz</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Heslo úspěšně změněno!</h1>
            <p className="text-muted-foreground">Za chvíli budete přesměrováni na přihlášení...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Nové heslo | Kastrup.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Nové heslo</h1>
            <p className="text-muted-foreground">Zadejte své nové heslo</p>
          </div>

          {/* Reset Form */}
          <div className="rounded-2xl border bg-card p-8 shadow-xl">
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <Label htmlFor="new-password">Nové heslo</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={8}
                    autoFocus
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Minimálně 8 znaků
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-password">Potvrďte heslo</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Ukládám..." : "Změnit heslo"}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            🔒 Heslo je bezpečně uloženo pomocí Supabase Auth
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
