-- Early-member visibility boost, in days, per signup.
-- Everyone who signed up before this change was promised 60 days; from now
-- on the form promises 7. Run this once in the Supabase SQL editor at the
-- moment you deploy the 7-day wording: every row that exists when it runs
-- is marked 60, every row inserted after it gets 7.

-- 1. Add the column. Existing rows are filled with 60.
alter table public.preregistrations
  add column if not exists boost_days integer not null default 60;

-- 2. New rows default to 7.
alter table public.preregistrations
  alter column boost_days set default 7;

-- 3. The form doesn't send boost_days; this trigger also overwrites whatever
--    an edited request might send, so nobody can give themselves 60.
--    Insert-only, so the existing 60-day rows can still be updated normally.
--    When the offer changes again, change the 7 here and in step 2.
create or replace function public.preregistrations_set_boost_days()
returns trigger
language plpgsql
as $$
begin
  new.boost_days := 7;
  return new;
end;
$$;

drop trigger if exists preregistrations_set_boost_days on public.preregistrations;
create trigger preregistrations_set_boost_days
  before insert on public.preregistrations
  for each row execute function public.preregistrations_set_boost_days();

-- Check: how many people have each boost.
-- select boost_days, count(*) from public.preregistrations group by boost_days;
