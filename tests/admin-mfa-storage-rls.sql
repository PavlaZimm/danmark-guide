-- Integration test for 20260925090000_require_admin_mfa_everywhere.sql. Everything rolls back.
-- Run as database owner via a trusted SQL connection, never from the web client.
-- Optional tables (contact_messages, accommodations) are tested only where they exist.
begin;

-- Test data, written as owner (bypasses RLS)
do $$ begin
  perform set_config('test.admin_id', (select id::text from public.profiles where role='admin' limit 1), true);
  if current_setting('test.admin_id', true) is null or current_setting('test.admin_id') = '' then
    raise exception 'No admin profile to test with';
  end if;
  insert into storage.buckets(id, name, public) values ('mfa-test-bucket', 'mfa-test-bucket', true) on conflict do nothing;
  insert into storage.objects(bucket_id, name) values ('mfa-test-bucket', 'mfa-existing');
  -- Same shape as the old admin-only policies of the 'articles'/'accommodations' buckets:
  -- the restrictive MFA policies must win over any such bucket, known or future.
  create policy "mfa test admin writes" on storage.objects for all to authenticated
    using (bucket_id = 'mfa-test-bucket' and public.is_admin())
    with check (bucket_id = 'mfa-test-bucket' and public.is_admin());
  if to_regclass('public.contact_messages') is not null then
    execute $q$insert into public.contact_messages(name, email, message) values ('MFA test', 'mfa@example.com', 'rollback')$q$;
  end if;
  if to_regclass('public.accommodations') is not null then
    execute $q$insert into public.accommodations(name, slug, description, city, address, type, price_per_night, contact)
      values ('MFA test', 'mfa-test-accommodation', 'x', 'x', 'x', 'hotel', 1, 'x')$q$;
  end if;
end $$;

-- Admin with password only (AAL1): no writes anywhere, no contact messages
do $$ begin
  perform set_config('request.jwt.claims', jsonb_build_object('sub', current_setting('test.admin_id'), 'role', 'authenticated', 'aal', 'aal1')::text, true);
end $$;
set local role authenticated;
do $$ declare n integer; begin
  begin
    insert into storage.objects(bucket_id, name) values ('mfa-test-bucket', 'mfa-blocked-insert');
    raise exception 'AAL1 admin can upload to any bucket';
  exception when insufficient_privilege then null; end;
  begin
    insert into storage.objects(bucket_id, name) values ('article-images', 'articles/mfa-blocked-article-image');
    raise exception 'AAL1 admin can upload article image';
  exception when insufficient_privilege then null; end;
  update storage.objects set name = 'mfa-renamed' where bucket_id = 'mfa-test-bucket' and name = 'mfa-existing';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'AAL1 admin can update objects in any bucket'; end if;
  -- Direct DELETE on storage.objects is refused by Supabase's storage.protect_delete()
  -- trigger even for the owner, so the delete policy (same shape as update) is not probed here.

  if to_regclass('public.contact_messages') is not null then
    execute $q$select count(*) from public.contact_messages where email = 'mfa@example.com'$q$ into n;
    if n <> 0 then raise exception 'AAL1 admin can read contact messages'; end if;
    execute $q$update public.contact_messages set status = 'read' where email = 'mfa@example.com'$q$;
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'AAL1 admin can update contact messages'; end if;
    execute $q$delete from public.contact_messages where email = 'mfa@example.com'$q$;
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'AAL1 admin can delete contact messages'; end if;
  end if;

  if to_regclass('public.accommodations') is not null then
    execute $q$select count(*) from public.accommodations where slug = 'mfa-test-accommodation'$q$ into n;
    if n <> 1 then raise exception 'Public accommodation read broken'; end if;
    execute $q$update public.accommodations set name = 'not allowed' where slug = 'mfa-test-accommodation'$q$;
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'AAL1 admin can update accommodations'; end if;
    execute $q$delete from public.accommodations where slug = 'mfa-test-accommodation'$q$;
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'AAL1 admin can delete accommodations'; end if;
    begin
      execute $q$insert into public.accommodations(name, slug, description, city, address, type, price_per_night, contact)
        values ('x', 'mfa-blocked-accommodation', 'x', 'x', 'x', 'hotel', 1, 'x')$q$;
      raise exception 'AAL1 admin can insert accommodations';
    exception when insufficient_privilege then null; end;
  end if;
end $$;
reset role;

-- Anonymous visitor: no uploads, no contact messages, the closed form rejects inserts
set local role anon;
do $$ declare n integer; begin
  begin
    insert into storage.objects(bucket_id, name) values ('mfa-test-bucket', 'mfa-anon');
    raise exception 'Anonymous can upload';
  exception when insufficient_privilege then null; end;
  if to_regclass('public.contact_messages') is not null then
    execute $q$select count(*) from public.contact_messages$q$ into n;
    if n <> 0 then raise exception 'Anonymous can read contact messages'; end if;
    begin
      execute $q$insert into public.contact_messages(name, email, message) values ('spam', 'spam@example.com', 'x')$q$;
      raise exception 'Anonymous can still submit the removed contact form';
    exception when insufficient_privilege then null; end;
  end if;
end $$;
reset role;

-- Admin with MFA (AAL2): everything the admin needs still works
do $$ begin
  perform set_config('request.jwt.claims', jsonb_build_object('sub', current_setting('test.admin_id'), 'role', 'authenticated', 'aal', 'aal2')::text, true);
end $$;
set local role authenticated;
do $$ declare n integer; begin
  insert into storage.objects(bucket_id, name) values ('article-images', 'articles/mfa-allowed-article-image');
  update storage.objects set name = 'mfa-renamed' where bucket_id = 'mfa-test-bucket' and name = 'mfa-existing';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'AAL2 admin cannot update objects'; end if;
  if to_regclass('public.contact_messages') is not null then
    execute $q$select count(*) from public.contact_messages where email = 'mfa@example.com'$q$ into n;
    if n <> 1 then raise exception 'AAL2 admin cannot read contact messages'; end if;
    execute $q$delete from public.contact_messages where email = 'mfa@example.com'$q$;
    get diagnostics n = row_count;
    if n <> 1 then raise exception 'AAL2 admin cannot delete contact messages'; end if;
  end if;
  if to_regclass('public.accommodations') is not null then
    execute $q$update public.accommodations set name = 'MFA ok' where slug = 'mfa-test-accommodation'$q$;
    get diagnostics n = row_count;
    if n <> 1 then raise exception 'AAL2 admin cannot update accommodations'; end if;
  end if;
end $$;
reset role;

select 'PASS: storage fail-closed, contact messages, accommodations (AAL1, AAL2, anonymous)' as result;
rollback;
