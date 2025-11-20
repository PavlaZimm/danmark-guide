-- Create storage bucket for article images
-- Created: 2025-01-20

-- Create the bucket for article images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for article images
-- Allow public read access
CREATE POLICY "Public read access for article images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-images' AND
  (storage.foldername(name))[1] = 'articles'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update article images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images')
WITH CHECK (bucket_id = 'article-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete article images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');
