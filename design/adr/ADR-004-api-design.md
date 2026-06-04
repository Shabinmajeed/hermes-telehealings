# ADR-004: API Design -- REST

## Status
Accepted

## Context
The platform has three distinct client surfaces (mobile app, therapist dashboard, admin dashboard) consuming data from a single backend. The API design must be simple to implement, easy to debug, and well-documented.

## Decision
Use a **REST API** design with resource-based endpoints.

## Consequences
- **Positive:** Simple to implement, debug, and document with OpenAPI/Swagger.
- **Positive:** Stateless and cache-friendly -- works well with CDNs and standard HTTP tooling.
- **Positive:** Straightforward to version (e.g., /api/v1/...).
- **Positive:** NestJS has excellent decorators for building clean REST controllers.
- **Negative:** Over-fetching/under-fetching is possible. We mitigate with query params for field selection and pagination.
- **Negative:** Multiple round-trips for complex nested data. We mitigate with well-designed response DTOs.

## Alternatives Considered
- **GraphQL:** Adds backend complexity and requires client-side libraries. Benefits are less compelling when the primary consumers are three controlled clients.
- **tRPC:** TypeScript-first but couples frontend and backend tightly, reducing the clean split we want.
