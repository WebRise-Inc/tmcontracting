# FAQ Admin Setup

This project supports a simple Neon-backed FAQ editor at `/faq/admin`.

## Environment

Add these values to your environment:

```bash
FAQ_DATABASE_URL=postgres://user:password@host/dbname?sslmode=require
FAQ_ADMIN_PASSWORD=change-this-password
```

## Behavior

- Public page: `/faq`
- Admin page: `/faq/admin`
- Admin page is marked `noindex`
- Admin auth is a single password stored in `FAQ_ADMIN_PASSWORD`
- FAQ content is stored in Neon as one JSON document per locale

## Table

The app creates the `faq_pages` table automatically the first time it needs it:

```sql
create table if not exists faq_pages (
  locale text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);
```

## First Run

1. Set `FAQ_DATABASE_URL`
2. Set `FAQ_ADMIN_PASSWORD`
3. Open `/faq/admin`
4. Log in
5. Edit and save

If the database is empty, the editor starts from the current hardcoded FAQ copy.
