-- ========================================
-- KOMPLETNÍ SETUP DATABÁZE PRO KASTRUP.CZ
-- Spusť tento soubor v Supabase SQL Editoru
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- PROFILES TABLE
-- ========================================
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- CATEGORIES TABLE
-- ========================================
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update categories"
  ON public.categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete categories"
  ON public.categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Insert default categories
INSERT INTO public.categories (name, slug) VALUES
  ('Cestování', 'cestovani'),
  ('Kultura', 'kultura'),
  ('Historie', 'historie'),
  ('Gastronomie', 'gastronomie'),
  ('Lifestyle', 'lifestyle'),
  ('Ubytování', 'ubytovani');

-- ========================================
-- ARTICLES TABLE
-- ========================================
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  perex TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image TEXT
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (published = true OR (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  ));

CREATE POLICY "Only admins can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update articles"
  ON public.articles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete articles"
  ON public.articles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create updated_at trigger for articles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ========================================
-- ACCOMMODATIONS TABLE
-- ========================================
CREATE TABLE public.accommodations (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'apartment', 'hostel')),
  price_per_night DECIMAL(10, 2) NOT NULL,
  contact TEXT NOT NULL,
  website TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image TEXT
);

ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accommodations are viewable by everyone"
  ON public.accommodations FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert accommodations"
  ON public.accommodations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update accommodations"
  ON public.accommodations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete accommodations"
  ON public.accommodations FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE TRIGGER update_accommodations_updated_at
  BEFORE UPDATE ON public.accommodations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ========================================
-- ACCOMMODATION REVIEWS TABLE
-- ========================================
CREATE TABLE public.accommodation_reviews (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  accommodation_id UUID NOT NULL REFERENCES public.accommodations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.accommodation_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON public.accommodation_reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.accommodation_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.accommodation_reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON public.accommodation_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- CONTACT MESSAGES TABLE
-- ========================================
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view contact messages"
  ON public.contact_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can update contact messages"
  ON public.contact_messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete contact messages"
  ON public.contact_messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- ========================================
-- STORAGE BUCKETS
-- ========================================

-- Articles bucket (starý systém)
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Accommodations bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('accommodations', 'accommodations', true)
ON CONFLICT (id) DO NOTHING;

-- Article Images bucket (nový systém pro nahrávání obrázků)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- STORAGE POLICIES - Articles bucket
-- ========================================
CREATE POLICY "Articles images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'articles');

CREATE POLICY "Admins can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update article images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete article images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ========================================
-- STORAGE POLICIES - Accommodations bucket
-- ========================================
CREATE POLICY "Accommodation images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'accommodations');

CREATE POLICY "Admins can upload accommodation images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'accommodations' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update accommodation images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'accommodations' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete accommodation images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'accommodations' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ========================================
-- STORAGE POLICIES - Article Images bucket (nový)
-- ========================================
CREATE POLICY "Public read access for article images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'article-images' AND
    (storage.foldername(name))[1] = 'articles'
  );

CREATE POLICY "Authenticated users can update article images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'article-images')
  WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can delete article images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'article-images');

-- ========================================
-- HOTOVO!
-- ========================================
-- Teď už jen potřebuješ:
-- 1. Vytvořit admin účet (přes Supabase Authentication)
-- 2. Nastavit mu role = 'admin' v tabulce profiles
