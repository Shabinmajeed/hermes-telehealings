# ADR-006: ORM -- Prisma

## Status
Accepted

## Context
The backend needs a type-safe database layer with migration support, compatible with Supabase PostgreSQL and NestJS.

## Decision
Use **Prisma** as the ORM.

## Consequences
- **Positive:** Type-safe query builder with auto-generated TypeScript types from schema.
- **Positive:** Declarative schema.prisma file serves as single source of truth for database structure.
- **Positive:** Prisma Migrate handles database migrations cleanly.
- **Positive:** Works seamlessly with Supabase PostgreSQL (standard Postgres connection string).
- **Positive:** Prisma Client integrates well with NestJS service layer.
- **Negative:** Adds a build step (prisma generate) to CI/CD pipeline.
- **Negative:** Raw SQL is occasionally needed for complex queries -- Prisma supports this via `$queryRaw`.

## Alternatives Considered
- **TypeORM:** Mature but decorator-heavy syntax; migration tooling less polished than Prisma.
- **Drizzle:** Newer, closer to SQL, but smaller ecosystem.
- **Supabase auto-generated API:** Useful for simple CRUD but insufficient for complex business logic in a NestJS backend.
