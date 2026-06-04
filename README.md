# Telehealings

A telehealth platform connecting users with licensed therapists. Built with React Native + Expo, NestJS, Supabase, and PostgreSQL.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native + Expo + TypeScript |
| Backend | NestJS + TypeScript |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| API | REST |
| State Management | Zustand |
| ORM | Prisma |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

## User Roles

- **User** -- Books appointments, video sessions, chat, payments, AI chatbot
- **Therapist** -- Manages availability, conducts sessions, communicates with users
- **Admin** -- Platform management, analytics, user/therapist oversight

## Project Structure

```
Telehealings/
  design/              -- Architecture Decision Records (ADRs)
  profiles/            -- Team role definitions
  frontend/            -- React Native + Expo
    app/               -- Expo Router screens (file-based routing)
      (auth)/          -- Login, signup
      (user)/          -- User-facing screens
      (therapist)/     -- Therapist dashboard
      (admin)/         -- Admin dashboard
    components/        -- Shared UI components
    hooks/             -- Custom React hooks
    services/          -- API client layer
    stores/            -- Zustand state stores
    types/             -- TypeScript type definitions
    constants/         -- Config, theme
    assets/            -- Images, fonts
  backend/             -- NestJS
    src/
      auth/            -- Auth module (Supabase Auth + JWT)
      users/           -- User management
      therapists/      -- Therapist profiles & availability
      appointments/    -- Booking & scheduling
      sessions/        -- Video session tracking
      chat/            -- Real-time messaging
      payments/        -- Stripe payments
      chatbot/         -- AI chatbot
      admin/           -- Admin operations
      common/          -- Guards, decorators, pipes, interceptors
      config/          -- Prisma, Supabase, env config
    prisma/            -- Database schema & migrations
    test/              -- Unit & integration tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- NestJS CLI (`npm install -g @nestjs/cli`)
- Supabase account + project

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Fill in your Supabase credentials
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

API runs at `http://localhost:3001/api/v1`
Swagger docs at `http://localhost:3001/api/docs`

### Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Press `w` for web, `a` for Android, `i` for iOS.

## Architecture Decisions

All ADRs are documented in `design/adr/`:

- ADR-001: Frontend Framework -- React Native with Expo
- ADR-002: Backend Framework -- NestJS
- ADR-003: Database & Auth -- Supabase
- ADR-004: API Design -- REST
- ADR-005: Deployment -- Vercel + Railway
- ADR-006: ORM -- Prisma
- ADR-007: State Management -- Zustand

## License

Proprietary -- Telehealings
# hermes-telehealings
