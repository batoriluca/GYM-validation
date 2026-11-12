-- Consent record for the "email me at launch" checkbox on the preregister form.
-- Run once in the Supabase SQL editor BEFORE deploying the form change,
-- otherwise inserts that include consent_launch_email will fail.

-- Removes the CHECK constraint from the first version of this file, in case
-- that one was already run. Harmless otherwise.
alter table public.preregistrations
  drop constraint if exists preregistrations_consent_required;

alter table public.preregistrations
  add column if not exists consent_launch_email boolean not null default false,
  add column if not exists consent_at timestamptz;

-- Rows from before the checkbox keep consent_launch_email = false and
-- consent_at = null. New rows get consent_at stamped by the database.
alter table public.preregistrations
  alter column consent_at set default now();

-- Mandatory for every new signup. A trigger (not a CHECK constraint) so it
-- only applies to inserts: old rows without consent can still be updated
-- or deleted normally.
create or replace function public.preregistrations_require_consent()
returns trigger
language plpgsql
as $$
begin
  if new.consent_launch_email is not true then
    raise exception 'consent_launch_email must be true';
  end if;
  new.consent_at := now();
  return new;
end;
$$;

drop trigger if exists preregistrations_require_consent on public.preregistrations;
create trigger preregistrations_require_consent
  before insert on public.preregistrations
  for each row execute function public.preregistrations_require_consent();
