-- Enrich lead capture tables with additional fields collected from forms.

alter table public.quote_requests
  add column if not exists postal_code text,
  add column if not exists age_bracket text,
  add column if not exists family_status text,
  add column if not exists current_insurer text,
  add column if not exists current_premium numeric,
  add column if not exists budget_max numeric,
  add column if not exists coverage_priorities text[],
  add column if not exists smoker boolean,
  add column if not exists preferred_contact text,
  add column if not exists preferred_time text,
  add column if not exists source_page text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text,
  add column if not exists gdpr_consent boolean not null default false,
  add column if not exists marketing_consent boolean not null default false;

alter table public.quote_requests
  drop constraint if exists qr_postal_fmt,
  add constraint qr_postal_fmt check (postal_code is null or postal_code ~ '^[0-9]{4,5}$');

alter table public.callback_requests
  add column if not exists email text,
  add column if not exists insurance_type text,
  add column if not exists postal_code text,
  add column if not exists source_page text,
  add column if not exists gdpr_consent boolean not null default false;

alter table public.newsletter_subscribers
  add column if not exists first_name text,
  add column if not exists interest text,
  add column if not exists source_page text,
  add column if not exists gdpr_consent boolean not null default false;

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists newsletter_subscribers_created_at_idx on public.newsletter_subscribers (created_at desc);
create index if not exists callback_requests_created_at_idx on public.callback_requests (created_at desc);

grant select, insert, update, delete on public.quote_requests to authenticated;
grant insert on public.quote_requests to anon;
grant all on public.quote_requests to service_role;

grant select, insert, update, delete on public.callback_requests to authenticated;
grant insert on public.callback_requests to anon;
grant all on public.callback_requests to service_role;

grant select, insert, update, delete on public.newsletter_subscribers to authenticated;
grant insert on public.newsletter_subscribers to anon;
grant all on public.newsletter_subscribers to service_role;
