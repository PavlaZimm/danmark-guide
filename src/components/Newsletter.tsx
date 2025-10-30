import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Zadejte prosím emailovou adresu");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Zadejte prosím platnou emailovou adresu");
      return;
    }

    setLoading(true);

    // Simulate API call (replace with actual newsletter service integration)
    setTimeout(() => {
      toast.success("Děkujeme! Brzy vás budeme informovat o novinkách.");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-6 h-12 w-12 text-white" />
          <h2 className="mb-4 text-white">Přihlaste se k odběru novinek</h2>
          <p className="mb-8 text-lg text-white/90">
            Dostávejte pravidelně novinky o Dánsku, tipy na cestování a nejnovější články přímo do vaší schránky.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Vaše emailová adresa"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-foreground"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
              disabled={loading}
            >
              {loading ? "Odesílám..." : "Přihlásit se"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-white/70">
            Vaše osobní údaje jsou v bezpečí. Odhlásit se můžete kdykoli.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
