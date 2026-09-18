-- Require verified MFA for admin operations, including direct Data API requests.
-- Existing permissive policies continue to define roles and public read access.
-- Own profile SELECT remains available at AAL1 to discover the admin role.

create policy "MFA required for articles insert" on public.articles
 as restrictive for insert to authenticated with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for articles update" on public.articles
 as restrictive for update to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())) with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for articles delete" on public.articles
 as restrictive for delete to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for profiles insert" on public.profiles
 as restrictive for insert to authenticated with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for profiles update" on public.profiles
 as restrictive for update to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())) with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for profiles delete" on public.profiles
 as restrictive for delete to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for categories insert" on public.categories
 as restrictive for insert to authenticated with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for categories update" on public.categories
 as restrictive for update to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())) with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required for categories delete" on public.categories
 as restrictive for delete to authenticated using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA required to read drafts" on public.articles
 as restrictive for select to authenticated
 using (published = true or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())));

create policy "MFA required to read other profiles" on public.profiles
 as restrictive for select to authenticated
 using (id = (select auth.uid()) or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())));

create policy "MFA admin required for images insert" on storage.objects
 as restrictive for insert to authenticated with check (bucket_id <> 'article-images' or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())));

create policy "MFA admin required for images update" on storage.objects
 as restrictive for update to authenticated using (bucket_id <> 'article-images' or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()))) with check (bucket_id <> 'article-images' or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())));

create policy "MFA admin required for images delete" on storage.objects
 as restrictive for delete to authenticated using (bucket_id <> 'article-images' or ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin())));

-- Backups must not expose drafts through a second unprotected table.
-- This table is maintained only by the database owner/service role, not the app.
alter table public.zalohy_clanku enable row level security;
revoke all on public.zalohy_clanku from anon, authenticated;

-- TRUNCATE bypasses row policies and is never needed by the web client.
revoke truncate, references, trigger on public.articles, public.profiles, public.categories from anon, authenticated;
