import { useState } from "react";
import { Upload, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageInsert: (html: string) => void;
  onUrlGenerated?: (url: string) => void;
}

const ImageUploadDialog = ({ open, onOpenChange, onImageInsert, onUrlGenerated }: ImageUploadDialogProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Prosím nahrajte obrázek");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Obrázek je příliš velký. Maximum je 10MB.");
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setUploadedUrl(publicUrl);

      // Call the callback with the URL if provided
      if (onUrlGenerated) {
        onUrlGenerated(publicUrl);
      }

      toast.success("Obrázek nahrán!");
    } catch (error: unknown) {
      console.error('Error uploading image:', error);
      toast.error(error.message || "Nepodařilo se nahrát obrázek");
    } finally {
      setUploading(false);
    }
  };

  const generateOptimizedHTML = () => {
    if (!uploadedUrl) return "";

    // Extract filename without extension
    const urlWithoutExt = uploadedUrl.replace(/\.[^/.]+$/, "");
    const ext = uploadedUrl.split('.').pop();

    // Generate HTML with picture element (WebP + fallback)
    // Note: For now, we use the same image for both. User should upload both formats.
    const hasWebP = ext === 'webp';

    let html = `<figure style="margin: 30px 0; text-align: center;">
  <picture>`;

    if (hasWebP) {
      html += `
    <source srcset="${uploadedUrl}" type="image/webp" />
    <img
      src="${uploadedUrl}"
      alt="${altText || 'Obrázek'}"
      loading="lazy"
      style="width: 100%; max-width: 800px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
    />`;
    } else {
      // If not WebP, suggest user to create WebP version
      html += `
    <source srcset="${urlWithoutExt}.webp" type="image/webp" />
    <img
      src="${uploadedUrl}"
      alt="${altText || 'Obrázek'}"
      loading="lazy"
      style="width: 100%; max-width: 800px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
    />`;
    }

    html += `
  </picture>`;

    if (caption) {
      html += `
  <figcaption style="color: #666; font-size: 14px; margin-top: 12px; font-style: italic;">
    ${caption}
  </figcaption>`;
    }

    html += `
</figure>`;

    return html;
  };

  const handleInsert = () => {
    if (!uploadedUrl) {
      toast.error("Nejdřív nahrajte obrázek!");
      return;
    }

    if (!altText) {
      toast.error("Alt text je povinný!");
      return;
    }

    const html = generateOptimizedHTML();
    if (html) {
      onImageInsert(html);
      handleClose();
      toast.success("Obrázek vložen do článku!");
    }
  };

  const handleCopyHTML = () => {
    const html = generateOptimizedHTML();
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("HTML zkopírováno!");
  };

  const handleClose = () => {
    // Reset all state
    setUploadedUrl("");
    setAltText("");
    setCaption("");
    setCopied(false);
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // When closing, reset everything
      handleClose();
    } else {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nahrát obrázek</DialogTitle>
          <DialogDescription>
            Nahrajte obrázek pro článek. Pro nejlepší výkon doporučujeme WebP formát.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="image-upload">Vyberte obrázek</Label>
            <div className="mt-2">
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary/50"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {uploading ? "Nahrávám..." : "Klikněte pro výběr nebo přetáhněte obrázek"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG, WebP, GIF (max. 10MB)
                  </p>
                </div>
              </label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>
          </div>

          {/* Uploaded Image Preview */}
          {uploadedUrl && (
            <>
              <div>
                <Label>Náhled</Label>
                <div className="mt-2 rounded-lg border p-4">
                  <img
                    src={uploadedUrl}
                    alt="Preview"
                    className="h-auto w-full rounded-lg"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="image-url">URL obrázku</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="image-url"
                    value={uploadedUrl}
                    readOnly
                    className="font-mono text-sm"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(uploadedUrl);
                      toast.success("URL zkopírováno!");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Můžete zkopírovat URL pro manuální použití v článku
                </p>
              </div>

              {/* Alt Text */}
              <div>
                <Label htmlFor="alt-text">
                  Alt text (popis pro SEO a přístupnost) *
                </Label>
                <Input
                  id="alt-text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Např: Barevné domky v Nyhavnu, Kodaň, Dánsko"
                  className="mt-2"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Popište co je na obrázku vidět. Důležité pro SEO!
                </p>
              </div>

              {/* Caption */}
              <div>
                <Label htmlFor="caption">Popisek (volitelné)</Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Např: Nyhavn - ikonický přístav Kodaně"
                  rows={2}
                  className="mt-2"
                />
              </div>

              {/* Generated HTML Preview */}
              <div>
                <div className="flex items-center justify-between">
                  <Label>Náhled HTML kódu</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyHTML}
                    disabled={!altText}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Zkopírováno
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Kopírovat HTML
                      </>
                    )}
                  </Button>
                </div>
                <div className="mt-2 max-h-48 overflow-y-auto rounded-lg bg-muted p-4">
                  <pre className="text-xs">
                    <code>{generateOptimizedHTML()}</code>
                  </pre>
                </div>
                {!altText && (
                  <p className="mt-2 text-sm text-destructive">
                    ⚠️ Vyplňte alt text před vložením
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Zrušit
                </Button>
                <Button onClick={handleInsert} disabled={!altText}>
                  Vložit do článku
                </Button>
              </div>

              {/* Optimization Note */}
              <div className="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-950">
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  💡 Tip pro optimalizaci:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-blue-800 dark:text-blue-200">
                  <li>Pro nejlepší výkon nahrajte obrázek ve formátu WebP</li>
                  <li>Doporučená maximální šířka: 1920px</li>
                  <li>Použijte nástroj <a href="https://squoosh.app" target="_blank" rel="noopener" className="underline">squoosh.app</a> pro optimalizaci</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
