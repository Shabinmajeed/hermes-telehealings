# ADR-001: Frontend Framework -- React Native with Expo

## Status
Accepted

## Context
The platform requires three user-facing interfaces: a mobile-first app for Users, and larger-screen dashboards for Therapists and Admins. We need to support iOS, Android, and Web without maintaining separate codebases.

## Decision
Use **React Native with Expo** as the single frontend framework.

## Consequences
- **Positive:** One codebase targets iOS, Android, and Web. Expo handles build tooling, OTA updates, and a large library of pre-built modules.
- **Positive:** Strong TypeScript support out of the box.
- **Positive:** Expo Router provides file-based routing for both mobile and web.
- **Negative:** Web output may not be as polished as a pure React (Next.js) web app for the therapist/admin dashboards. We mitigate this by using responsive layouts and testing on tablet/desktop viewports.
- **Negative:** Some native modules require ejecting to bare workflow or using config plugins. We stay in managed workflow as long as possible.

## Alternatives Considered
- **React Native (bare) + separate React web app:** Maximum flexibility but doubles frontend maintenance.
- **Flutter:** Strong alternative but team chose React Native for ecosystem and TypeScript alignment.
