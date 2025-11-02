import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Breadcrumbs from "@/components/Breadcrumbs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit the contact form to Supabase
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        });

      if (error) {
        throw error;
      }

      toast.success("Děkujeme za vaši zprávu! Brzy vám odpovíme.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kontakt | Kastrup.cz</title>
        <meta
          name="description"
          content="Máte dotaz o Dánsku? Kontaktujte nás a rádi vám pomůžeme s plánováním vaší cesty."
        />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Kontakt" }]} />

            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">Kontakt</h1>
              <p className="text-xl text-muted-foreground">
                Máte dotaz? Rádi vám pomůžeme!
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="mb-6 text-2xl font-semibold">Kontaktní údaje</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@kastrup.cz</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Telefon</h3>
                      <p className="text-muted-foreground">+420 XXX XXX XXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Adresa</h3>
                      <p className="text-muted-foreground">
                        Praha, Česká republika
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-semibold">
                  Napište nám zprávu
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Jméno *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Zpráva *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Odesílání..." : "Odeslat zprávu"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-16">
              <h2 className="mb-6 text-center text-2xl font-bold">
                Možná vás také zajímá
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Link to="/o-dansku" className="group">
                  <div className="rounded-lg bg-gradient-card p-6 transition-all hover:shadow-medium">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      O Dánsku
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Poznejte zemi vikingů, hygge a moderního designu
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Zjistit více
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>

                <Link to="/ubytovani" className="group">
                  <div className="rounded-lg bg-gradient-card p-6 transition-all hover:shadow-medium">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      Ubytování
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Najděte perfektní místo pro váš pobyt v Dánsku
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Prohlédnout
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>

                <Link to="/clanky" className="group">
                  <div className="rounded-lg bg-gradient-card p-6 transition-all hover:shadow-medium">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      Články
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Čtěte zajímavé články o dánské kultuře a cestování
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Číst články
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
