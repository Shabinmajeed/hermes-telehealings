# ADR-002: Backend Framework -- NestJS

## Status
Accepted

## Context
The backend needs to serve a REST API supporting three user roles (User, Therapist, Admin) with potentially complex business logic around appointments, sessions, and user management. A structured, modular framework will help as the codebase grows.

## Decision
Use **NestJS** as the backend framework.

## Consequences
- **Positive:** Opinionated modular architecture (modules, controllers, services) enforces clean separation of concerns.
- **Positive:** First-class TypeScript support with decorators and dependency injection.
- **Positive:** Built-in support for guards, pipes, interceptors, and middleware -- well-suited for role-based access control.
- **Positive:** Excellent CLI tooling for scaffolding modules, controllers, and services.
- **Negative:** Steeper learning curve than Express/Fastify for developers unfamiliar with Angular-style patterns.
- **Negative:** Slightly heavier than minimal frameworks -- acceptable trade-off for project structure.

## Alternatives Considered
- **Express.js:** Too unstructured for a multi-role platform with growing complexity.
- **Fastify:** Strong performance and TypeScript support but less opinionated on architecture.
