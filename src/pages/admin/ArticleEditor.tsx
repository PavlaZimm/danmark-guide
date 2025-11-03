import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Home,
  LogOut,
  Save,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [perex, setPerex] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [authorId, setAuthorId] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Začněte psát obsah článku...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] px-4 py-2",
      },
    },
  });

  useEffect(() => {
    fetchCategories();
    fetchAuthorId();
    if (isEditMode) {
      fetchArticle();
    }
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    setCategories(data || []);
  };

  const fetchAuthorId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setAuthorId(user.id);
  };

  const fetchArticle = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setPerex(data.perex);
      setImageUrl(data.image_url || "");
      setCategoryId(data.category_id);
      setPublished(data.published);
      setMetaTitle(data.meta_title || "");
      setMetaDescription(data.meta_description || "");
      setFocusKeyword(data.focus_keyword || "");
      editor?.commands.setContent(data.content);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error("Nepodařilo se načíst článek");
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditMode && !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (shouldPublish?: boolean) => {
    if (!title || !slug || !perex || !categoryId || !editor) {
      toast.error("Vyplňte prosím všechna povinná pole");
      return;
    }

    setLoading(true);

    try {
      const content = editor.getHTML();
      const articleData = {
        title,
        slug,
        perex,
        content,
        category_id: categoryId,
        image_url: imageUrl || null,
        published: shouldPublish !== undefined ? shouldPublish : published,
        author_id: authorId,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        focus_keyword: focusKeyword || null,
      };

      if (isEditMode) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Článek uložen");
      } else {
        const { error } = await supabase
          .from("articles")
          .insert(articleData);

        if (error) throw error;
        toast.success("Článek vytvořen");
      }

      navigate("/tajnedvere/articles");
    } catch (error: any) {
      console.error("Error saving article:", error);
      toast.error(error.message || "Nepodařilo se uložit článek");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/tajnedvere");
  };

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap gap-1 border-b bg-muted/50 p-2">
        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <div className="mx-2 w-px bg-border" />
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="mx-2 w-px bg-border" />
        <Button
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="mx-2 w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("URL odkazu:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("URL obrázku:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? "Editace článku" : "Nový článek"} - Administrace | Kastrup.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background shadow-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/tajnedvere/dashboard">
                <h1 className="text-2xl font-bold hover:text-primary">Administrace</h1>
              </Link>
              <span className="text-muted-foreground">›</span>
              <span className="text-sm text-muted-foreground">
                {isEditMode ? "Editace článku" : "Nový článek"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Zpět na web
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Odhlásit se
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {isEditMode ? "Editace článku" : "Nový článek"}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSave(false)}
                  disabled={loading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Uložit koncept
                </Button>
                <Button
                  onClick={() => handleSave(true)}
                  disabled={loading}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {loading ? "Ukládám..." : "Publikovat"}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Základní informace</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Název článku *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Např: 10 nejlepších restaurací v Kodani"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL adresa (slug) *</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="10-nejlepsich-restauraci-v-kodani"
                      className="mt-2"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      URL: /clanek/{slug || "url-adresa"}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="perex">Perex (krátký úvod) *</Label>
                    <Textarea
                      id="perex"
                      value={perex}
                      onChange={(e) => setPerex(e.target.value)}
                      placeholder="Stručný popis článku (150-200 znaků)"
                      rows={3}
                      className="mt-2"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      {perex.length} znaků
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="category">Kategorie *</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Vyberte kategorii" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="image">URL hlavního obrázku</Label>
                    <Input
                      id="image"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="mt-2"
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="mt-2 h-32 w-auto rounded-lg object-cover"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="published">Publikováno</Label>
                      <p className="text-sm text-muted-foreground">
                        Zobrazit článek na webu
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="border-b p-4">
                  <h3 className="text-xl font-semibold">Obsah článku *</h3>
                  <p className="text-sm text-muted-foreground">
                    Použijte toolbar pro formátování textu
                  </p>
                </div>
                <MenuBar />
                <div className="min-h-[400px]">
                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">SEO nastavení</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta titulek</Label>
                    <Input
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="10 nejlepších restaurací v Kodani | Kastrup.cz"
                      className="mt-2"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      {metaTitle.length}/60 znaků (doporučeno: 50-60)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta popis</Label>
                    <Textarea
                      id="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Objevte nejlepší restaurace v Kodani. Od michelinských hvězd po tradiční dánskou kuchyni."
                      rows={2}
                      className="mt-2"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      {metaDescription.length}/160 znaků (doporučeno: 150-160)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="focusKeyword">Klíčové slovo</Label>
                    <Input
                      id="focusKeyword"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="restaurace kodaň"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Link to="/tajnedvere/articles">
                  <Button variant="outline">Zrušit</Button>
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSave(false)}
                    disabled={loading}
                  >
                    Uložit koncept
                  </Button>
                  <Button
                    onClick={() => handleSave(true)}
                    disabled={loading}
                  >
                    {loading ? "Ukládám..." : "Publikovat článek"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ArticleEditor;
