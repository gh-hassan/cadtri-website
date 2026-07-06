-- Run this in the Supabase SQL editor to create the blog_posts table.

create table if not exists blog_posts (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  excerpt           text not null default '',
  content_html      text not null default '',
  category          text not null default 'Permitting',
  reading_time      text not null default '5 min read',
  image             text,
  image_alt         text,
  image_title       text,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  meta_title        text,
  meta_description  text,
  focus_keyword     text,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on blog_posts (status, published_at desc);
create index if not exists blog_posts_slug_idx on blog_posts (slug);
