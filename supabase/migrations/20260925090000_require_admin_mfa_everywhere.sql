-- Close the MFA gaps found by the security scan of 25. 9. 2026 (findings F1-F3).
-- 20260918140433_require_admin_mfa.sql required AAL2 only for articles, profiles,
-- categories and the 'article-images' bucket. A password-only (AAL1) admin session
-- could still read contact messages, write accommodations and upload files into
-- every other storage bucket through the Data API.
--
-- Signed-in users (authenticated) need an AAL2 admin; anonymous visitors (anon) get a
-- plain "never", because public.is_admin() is not executable by anon.
-- The migration is safe to run whether or not the optional tables exist in a given
-- project, and safe to run twice. It removes no data and no table.

-- 1) Storage: fail closed. Every write to any bucket needs an AAL2 admin.
--    The app only uploads to 'article-images' (ImageUploadDialog.tsx), already as AAL2 admin.
drop policy if exists "MFA admin required for images insert" on storage.objects;
drop policy if exists "MFA admin required for images update" on storage.objects;
drop policy if exists "MFA admin required for images delete" on storage.objects;
drop policy if exists "MFA admin required for storage insert" on storage.objects;
drop policy if exists "MFA admin required for storage update" on storage.objects;
drop policy if exists "MFA admin required for storage delete" on storage.objects;
drop policy if exists "No anonymous storage writes" on storage.objects;

create policy "MFA admin required for storage insert" on storage.objects
 as restrictive for insert to authenticated
 with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA admin required for storage update" on storage.objects
 as restrictive for update to authenticated
 using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()))
 with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

create policy "MFA admin required for storage delete" on storage.objects
 as restrictive for delete to authenticated
 using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

-- Anonymous visitors never write to storage. Public reading of images is untouched:
-- these policies cover INSERT/UPDATE/DELETE only, not SELECT.
drop policy if exists "No anonymous storage updates" on storage.objects;
drop policy if exists "No anonymous storage deletes" on storage.objects;
create policy "No anonymous storage writes" on storage.objects
 as restrictive for insert to anon with check (false);
create policy "No anonymous storage updates" on storage.objects
 as restrictive for update to anon using (false) with check (false);
create policy "No anonymous storage deletes" on storage.objects
 as restrictive for delete to anon using (false);

-- 2) Contact messages (visitor names, e-mails, texts): only an AAL2 admin, for everything.
--    The contact form was removed from the site, so inserts are closed as well.
do $$
begin
  if to_regclass('public.contact_messages') is null then
    raise notice 'public.contact_messages does not exist, skipped';
    return;
  end if;

  drop policy if exists "MFA admin required for contact messages" on public.contact_messages;
  drop policy if exists "No anonymous access to contact messages" on public.contact_messages;

  create policy "MFA admin required for contact messages" on public.contact_messages
   as restrictive for all to authenticated
   using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()))
   with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

  create policy "No anonymous access to contact messages" on public.contact_messages
   as restrictive for all to anon
   using (false) with check (false);

  revoke truncate, references, trigger on public.contact_messages from anon, authenticated;
end $$;

-- 3) Accommodations: public reading stays, every write needs an AAL2 admin.
do $$
begin
  if to_regclass('public.accommodations') is null then
    raise notice 'public.accommodations does not exist, skipped';
    return;
  end if;

  drop policy if exists "MFA required for accommodations insert" on public.accommodations;
  drop policy if exists "MFA required for accommodations update" on public.accommodations;
  drop policy if exists "MFA required for accommodations delete" on public.accommodations;
  drop policy if exists "No anonymous accommodation insert" on public.accommodations;
  drop policy if exists "No anonymous accommodation update" on public.accommodations;
  drop policy if exists "No anonymous accommodation delete" on public.accommodations;

  create policy "MFA required for accommodations insert" on public.accommodations
   as restrictive for insert to authenticated
   with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

  create policy "MFA required for accommodations update" on public.accommodations
   as restrictive for update to authenticated
   using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()))
   with check ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

  create policy "MFA required for accommodations delete" on public.accommodations
   as restrictive for delete to authenticated
   using ((select auth.jwt()->>'aal') = 'aal2' and (select public.is_admin()));

  create policy "No anonymous accommodation insert" on public.accommodations
   as restrictive for insert to anon with check (false);
  create policy "No anonymous accommodation update" on public.accommodations
   as restrictive for update to anon using (false) with check (false);
  create policy "No anonymous accommodation delete" on public.accommodations
   as restrictive for delete to anon using (false);

  revoke truncate, references, trigger on public.accommodations from anon, authenticated;
end $$;
