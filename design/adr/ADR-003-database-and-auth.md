# ADR-003: Database & Authentication -- Supabase

## Status
Accepted

## Context
The platform needs a relational database and a robust authentication system with role-based access control (User, Therapist, Admin). Managing auth flows, session tokens, and user roles from scratch is error-prone and time-consuming.

## Decision
Use **Supabase** as both the PostgreSQL database provider and the authentication layer.

## Consequences
- **Positive:** Fully managed PostgreSQL -- no need to self-host or manage database infrastructure.
- **Positive:** Supabase Auth provides email/password, OAuth, magic link, and phone auth out of the box.
- **Positive:** Row Level Security (RLS) policies allow fine-grained, database-enforced access control per user role.
- **Positive:** Auto-generated REST API from database schemas via PostgREST -- useful for simple CRUD alongside our NestJS API.
- **Positive:** Real-time subscriptions available via Supabase Realtime if needed later (e.g., live session updates, chat).
- **Negative:** Vendor lock-in to Supabase for auth and database. Migration path exists (standard PostgreSQL) but would require work.
- **Negative:** RLS policies require careful design -- mistakes can silently restrict access rather than fail loudly.

## Alternatives Considered
- **Self-hosted PostgreSQL + Supabase Auth only:** Adds operational overhead without clear benefit.
- **Firebase:** NoSQL-first, weaker relational modeling than PostgreSQL.
- **Auth0 + separate Postgres:** More expensive, more integration work.
