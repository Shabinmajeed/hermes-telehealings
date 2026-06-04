# ADR-005: Deployment -- Vercel (Frontend) + Railway (Backend)

## Status
Accepted

## Context
We need straightforward, cost-effective hosting with good CI/CD integration, environment variable management, and minimal DevOps overhead for the initial phases.

## Decision
- **Frontend (React Native + Expo Web):** Deploy to **Vercel**
- **Backend (NestJS):** Deploy to **Railway**
- **Database & Auth (Supabase):** Hosted on **Supabase Cloud**

## Consequences
- **Positive:** Vercel has first-class support for static and serverless web deployments with automatic preview builds per PR.
- **Positive:** Railway supports Node.js apps natively with managed environment variables, secrets, and easy database connection.
- **Positive:** Both platforms offer generous free/early-stage tiers.
- **Positive:** Git-triggered CI/CD out of the box -- push to main deploys.
- **Positive:** Supabase Cloud includes database, auth, and auto-generated APIs in one dashboard.
- **Negative:** Vercel is optimized for Next.js. Expo Web builds work but are a secondary target -- we monitor build output carefully.
- **Negative:** We avoid Vercel serverless functions for our API (we use NestJS on Railway instead). Frontend API calls hit the Railway backend URL.

## Alternatives Considered
- **AWS (ECS/Lambda/Amplify):** More configurable but higher DevOps overhead. Revisit at scale.
- **Render:** Comparable to Railway; chose Railway for developer experience.
- **Fly.io:** Strong alternative but less Turnkey for Node.js APIs.
