import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Shield } from "lucide-react";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  // Generate random math captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`Kolik je ${num1} + ${num2}?`);
    setCaptchaAnswer(num1 + num2);
    setCaptchaInput("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate captcha
    if (parseInt(captchaInput) !== captchaAnswer) {
      toast.error("Špatná odpověď na bezpečnostní otázku");
      generateCaptcha(); // Generate new question
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Hesla se neshodují");
      return;
    }

    if (password.length < 6) {
      toast.error("Heslo musí mít alespoň 6 znaků");
      return;
    }

    setLoading(true);

    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Registrace selhala");
      }

      // Create profile with admin role
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          email: authData.user.email,
          role: "admin",
        });

      if (profileError) {
        // If profile already exists, update it
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ role: "admin" })
          .eq("id", authData.user.id);

        if (updateError) throw updateError;
      }

      toast.success("Registrace úspěšná! Nyní se můžete přihlásit.");
      navigate("/tajnedvere");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Nepodařilo se zaregistrovat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Registrace admina</CardTitle>
          <CardDescription className="text-center">
            Vytvořte si admin účet pro správu webu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                placeholder="Alespoň 6 znaků"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potvrdit heslo</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Zadejte heslo znovu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="captcha" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Bezpečnostní otázka
              </Label>
              <div className="rounded-lg border bg-muted/50 p-3 mb-2">
                <p className="text-center font-semibold">{captchaQuestion}</p>
              </div>
              <Input
                id="captcha"
                type="number"
                placeholder="Zadejte výsledek"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Pro ověření, že nejste robot, vyřešte prosím tento jednoduchý příklad.
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registruji..." : "Zaregistrovat se"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Už máte účet? </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={() => navigate("/tajnedvere")}
              >
                Přihlásit se
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegister;
