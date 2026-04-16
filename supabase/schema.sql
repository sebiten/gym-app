create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  document_id text,
  notes text,
  registered_at date not null default now()::date,
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  months_duration integer not null check (months_duration > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  plan_id uuid references public.plans(id) on delete set null,
  start_date date not null,
  end_date date not null,
  months_paid integer not null check (months_paid > 0),
  notification_sent_at timestamptz,
  created_at timestamptz not null default now()
);

insert into public.plans (name, slug, description, months_duration, is_active)
values (
  'Plan mensual',
  'plan-mensual',
  'Plan base configurable para altas y renovaciones manuales.',
  1,
  true
)
on conflict (slug) do nothing;

create or replace view public.member_status_view as
with latest_membership as (
  select distinct on (member_id)
    member_id,
    plan_id,
    start_date,
    end_date,
    months_paid,
    notification_sent_at
  from public.memberships
  order by member_id, end_date desc, created_at desc
)
select
  m.id,
  m.full_name,
  m.email,
  m.phone,
  m.document_id,
  m.registered_at,
  lm.start_date as current_plan_started_at,
  lm.end_date as current_plan_ends_at,
  p.name as plan_name,
  lm.months_paid,
  lm.notification_sent_at,
  (lm.end_date - current_date) as days_remaining,
  case
    when lm.end_date < current_date then 'expired'
    when lm.end_date <= current_date + 7 then 'expiring'
    else 'active'
  end as status
from public.members m
join latest_membership lm on lm.member_id = m.id
left join public.plans p on p.id = lm.plan_id;

alter table public.members enable row level security;
alter table public.plans enable row level security;
alter table public.memberships enable row level security;

create policy "Admins can read members"
on public.members
for select
to authenticated
using (true);

create policy "Admins can insert members"
on public.members
for insert
to authenticated
with check (true);

create policy "Admins can update members"
on public.members
for update
to authenticated
using (true)
with check (true);

create policy "Admins can read plans"
on public.plans
for select
to authenticated
using (true);

create policy "Admins can insert plans"
on public.plans
for insert
to authenticated
with check (true);

create policy "Admins can read memberships"
on public.memberships
for select
to authenticated
using (true);

create policy "Admins can insert memberships"
on public.memberships
for insert
to authenticated
with check (true);

create policy "Admins can update memberships"
on public.memberships
for update
to authenticated
using (true)
with check (true);

create index if not exists idx_memberships_member_end_date
on public.memberships(member_id, end_date desc);
