create table if not exists site_copy (
  id int primary key,
  body jsonb not null default '{}'::jsonb,
  updated_by text,
  updated_at timestamptz not null default now()
);

insert into site_copy (id, body)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
