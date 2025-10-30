import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const fullUrl = url.startsWith("http") ? url : `https://kastrup.cz${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Odkaz zkopírován do schránky");
    } catch (error) {
      toast.error("Nepodařilo se zkopírovat odkaz");
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:bg-gray-600 hover:text-white",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Sdílet:</span>

      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.name}
            variant="outline"
            size="icon"
            className={`transition-all ${social.color}`}
            onClick={() => window.open(social.url, "_blank", "width=600,height=400")}
            aria-label={`Sdílet na ${social.name}`}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        className="transition-all hover:bg-primary hover:text-primary-foreground"
        onClick={handleCopyLink}
        aria-label="Zkopírovat odkaz"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialShare;
