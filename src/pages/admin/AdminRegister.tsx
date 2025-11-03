import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

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
