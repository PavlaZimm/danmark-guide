-- Integration test for the production policy shape. Everything rolls back.
-- Run as database owner via a trusted SQL connection, never from the web client.
begin;
do $$ begin
  perform set_config('test.admin_id', (select id::text from public.profiles where role='admin' limit 1), true);
  perform set_config('test.category_id', (select id::text from public.categories limit 1), true);
  perform set_config('test.article_id', gen_random_uuid()::text, true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', current_setting('test.admin_id'), 'role','authenticated','aal','aal2')::text, true);
end $$;
set local role authenticated;
do $$ declare n integer; begin
  insert into public.articles(id,title,slug,perex,content,category_id,author_id,published)
  values(current_setting('test.article_id')::uuid,'MFA rollback test','mfa-test-'||current_setting('test.article_id'),'test','test',current_setting('test.category_id')::uuid,current_setting('test.admin_id')::uuid,false);
  if not exists(select 1 from public.articles where id=current_setting('test.article_id')::uuid) then raise exception 'AAL2 admin cannot read draft'; end if;
  update public.articles set title='MFA rollback test updated' where id=current_setting('test.article_id')::uuid;
  get diagnostics n=row_count;
  if n<>1 then raise exception 'AAL2 admin cannot update'; end if;
  insert into storage.objects(bucket_id,name) values('article-images','mfa-test-'||current_setting('test.article_id'));
end $$;
reset role;
do $$ begin
  perform set_config('request.jwt.claims', jsonb_build_object('sub', current_setting('test.admin_id'), 'role','authenticated','aal','aal1')::text,true);
end $$;
set local role authenticated;
do $$ declare n integer; begin
  if exists(select 1 from public.articles where id=current_setting('test.article_id')::uuid) then raise exception 'AAL1 can read draft'; end if;
  if not exists(select 1 from public.profiles where id=auth.uid()) then raise exception 'Own profile inaccessible before MFA'; end if;
  if not exists(select 1 from public.articles where published) then raise exception 'Public articles inaccessible at AAL1'; end if;
  update public.articles set title='not allowed' where id=current_setting('test.article_id')::uuid;
  get diagnostics n=row_count;
  if n<>0 then raise exception 'AAL1 can update article'; end if;
  delete from public.articles where id=current_setting('test.article_id')::uuid;
  get diagnostics n=row_count;
  if n<>0 then raise exception 'AAL1 can delete article'; end if;
  update public.profiles set role=role where id=auth.uid();
  get diagnostics n=row_count;
  if n<>0 then raise exception 'AAL1 can update profile'; end if;
  begin
    insert into public.articles(title,slug,perex,content,category_id,author_id,published)
    values('not allowed','mfa-blocked-'||gen_random_uuid(),'test','test',current_setting('test.category_id')::uuid,auth.uid(),false);
    raise exception 'AAL1 can insert article';
  exception when insufficient_privilege then null; end;
  begin
    insert into storage.objects(bucket_id,name) values('article-images','mfa-blocked-'||gen_random_uuid());
    raise exception 'AAL1 can upload image';
  exception when insufficient_privilege then null; end;
  update storage.objects set name=name where bucket_id='article-images' and name='mfa-test-'||current_setting('test.article_id');
  get diagnostics n=row_count;
  if n<>0 then raise exception 'AAL1 can update image'; end if;
  if has_table_privilege(current_user,'public.articles','TRUNCATE') then raise exception 'TRUNCATE bypass exists'; end if;
  if has_table_privilege(current_user,'public.zalohy_clanku','SELECT') then raise exception 'Backups exposed'; end if;
end $$;
reset role;
do $$ begin
  perform set_config('request.jwt.claims',jsonb_build_object('sub',gen_random_uuid(),'role','authenticated','aal','aal2')::text,true);
end $$;
set local role authenticated;
do $$ begin
  if public.is_admin() then raise exception 'Nonadmin gained admin role'; end if;
  if exists(select 1 from public.articles where id=current_setting('test.article_id')::uuid) then raise exception 'Nonadmin can read draft'; end if;
  begin
    insert into storage.objects(bucket_id,name) values('article-images','mfa-nonadmin-'||gen_random_uuid());
    raise exception 'Nonadmin can upload image';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$ begin
  if not exists(select 1 from public.articles where published) then raise exception 'Public articles unavailable'; end if;
  if exists(select 1 from public.articles where id=current_setting('test.article_id')::uuid) then raise exception 'Anonymous can read draft'; end if;
  if has_table_privilege(current_user,'public.zalohy_clanku','SELECT') then raise exception 'Anonymous backups exposed'; end if;
end $$;
reset role;
do $$ begin
  perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.admin_id'),'role','authenticated','aal','aal2')::text,true);
end $$;
set local role authenticated;
do $$ declare n integer; begin
  delete from public.articles where id=current_setting('test.article_id')::uuid;
  get diagnostics n=row_count;
  if n<>1 then raise exception 'AAL2 admin cannot delete'; end if;
end $$;
reset role;
select 'PASS: admin AAL1/AAL2, nonadmin AAL2, anonymous, drafts, articles, profiles, image writes, backup grants' as result;
rollback;
