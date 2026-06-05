# Telehealings -- Complete Product & Project Report

**Date:** June 2026
**Version:** 0.1.0 (Phase 1 -- Core Infrastructure & User Registration)
**Platform:** Mobile (iOS/Android) + Web (Admin)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [User Roles & Personas](#3-user-roles--personas)
4. [Complete User Flows](#4-complete-user-flows)
5. [Screen-by-Screen Specifications](#5-screen-by-screen-specifications)
6. [Feature Specifications](#6-feature-specifications)
7. [Tech Stack](#7-tech-stack)
8. [System Architecture](#8-system-architecture)
9. [Database Schema](#9-database-schema)
10. [API Specifications](#10-api-specifications)
11. [Design System](#11-design-system)
12. [Implemented Features](#12-implemented-features)
13. [Roadmap & Future Features](#13-roadmap--future-features)
14. [Development Setup](#14-development-setup)
15. [Known Issues](#15-known-issues)
16. [Architecture Decision Records](#16-architecture-decision-records)

---

## 1. Executive Summary

Telehealings is a telehealth platform that connects users with licensed therapists for mental health services. It provides therapy sessions via video/audio/chat, appointment scheduling, secure messaging, AI-powered mental health support, and comprehensive platform administration.

The platform is built as a **mobile-first** application (React Native + Expo) with a **web-based admin portal**. It supports three distinct user roles -- User (patient), Therapist, and Admin -- each with dedicated interfaces and capabilities.

**Current Phase:** Phase 1 -- Core infrastructure, user registration flow, admin authentication, and admin user management dashboard are functional. Phone OTP, therapist features, appointments, video sessions, chat, payments, and AI chatbot are planned for subsequent phases.

---

## 2. Product Overview

### 2.1 Product Vision

Make mental health support accessible, affordable, and approachable. Telehealings provides a HIPAA-aware platform where users can discover licensed therapists, book and attend sessions, communicate securely, and get AI-powered support between sessions.

### 2.2 Product Description

Telehealings is a full-featured telehealth platform supporting the entire therapy journey:

- **Discovery:** Users browse and search licensed therapists by specialization, availability, rating, and price
- **Onboarding:** Soft registration (minimal friction) followed by personalization (topic selection)
- **Booking:** Schedule appointments with therapists based on real-time availability
- **Sessions:** Video, audio, or chat-based therapy sessions with secure room management
- **Communication:** Real-time messaging between users and therapists
- **Payments:** Secure payment processing via Stripe, with refund and subscription support
- **AI Support:** AI chatbot for mood tracking, journaling, and between-session support
- **Administration:** Full platform management, user oversight, therapist verification, analytics

### 2.3 Target Audience

- **Primary:** Adults (18+) seeking mental health support
- **Secondary:** Licensed therapists seeking a platform to manage their practice
- **Tertiary:** Platform administrators managing operations

### 2.4 Key Differentiators

- Soft onboarding (no email/password required initially)
- AI-powered mental health companion (Heali)
- Multi-modal sessions (video, audio, chat)
- Integrated mood tracking and journaling
- Comprehensive admin analytics

---

## 3. User Roles & Personas

### 3.1 Role: User (Patient)

**Persona:** A person seeking mental health support. May be dealing with stress, anxiety, relationship issues, or general wellness goals.

**Permissions:**
- Register via soft onboarding (name + T&C) or full signup (email/phone + password)
- Browse and search therapists
- Book, reschedule, and cancel appointments
- Attend video/audio/chat sessions
- Send messages to therapists
- Make payments and view payment history
- Use AI chatbot (Heali)
- Track mood and journal
- Manage personal profile and preferences
- View session history and notes
- Leave reviews for therapists

### 3.2 Role: Therapist

**Persona:** A licensed mental health professional offering therapy services through the platform.

**Permissions:**
- Register and submit credentials for verification
- Set availability schedule
- Manage profile (bio, specializations, hourly rate, photo)
- Accept or decline appointment requests
- Conduct video/audio/chat sessions
- Write session notes
- Communicate with users via chat
- View earnings and payment history
- Manage notifications

### 3.3 Role: Admin

**Persona:** Platform operator responsible for managing users, therapists, content, and overall platform health.

**Permissions:**
- Admin login (username/password)
- View and manage all users (CRUD)
- View and manage all therapists (CRUD)
- Verify therapist credentials
- View all appointments and sessions
- Access analytics dashboard (user growth, revenue, session stats)
- Manage platform content
- View financial reports
- Manage promotions and offers
- Access audit logs
- Configure platform settings

---

## 4. Complete User Flows

### 4.1 New User Flow (Soft Onboarding)

```
App Launch
  |
  v
Splash Screen (2s Heali animation)
  |
  v
Marketing Screen (value propositions)
  |
  v
Onboarding Screen
  |-- Enter name
  |-- Accept Terms & Conditions (modal)
  |-- Tap Continue
  |
  v
Personalisation Screen
  |-- Select 1-3 focus topics:
  |     Stress, Anxiety, Sleep,
  |     Relationships, Self-esteem, Focus
  |-- Tap Continue
  |
  v
Home Dashboard
  |-- "Hi, [Name]" greeting
  |-- Heali chatbot
  |-- Mood tracker
  |-- Discover therapists
  |-- Book appointment
  |-- View upcoming sessions
  |-- Browse content library
```

### 4.2 Returning User Flow

```
App Launch
  |
  v
Splash Screen
  |
  v
[Check Auth State]
  |-- Valid session --> Home Dashboard
  |-- No session --> Login Screen
  |     |-- Email/Password login
  |     |-- Phone OTP login
  |     |-- Google OAuth
  |     |-- Apple OAuth
  |     |-- "New user? Sign up" link
```

### 4.3 Full Signup Flow (Alternative)

```
Signup Entry
  |
  v
Phone Verification
  |-- Enter phone number
  |-- Receive OTP via SMS
  |-- Enter 6-digit OTP
  |-- Verify
  |
  v
Contact Details
  |-- Full name
  |-- Email
  |-- Date of birth
  |-- Gender
  |-- Address
  |
  v
Profile Completion
  |-- Occupation
  |-- Marital status
  |-- Emergency contact (name, phone, relationship)
  |-- Profile photo
  |
  v
Profile Success
  |-- Celebration animation
  |-- "Get Started" button
  |
  v
Personalisation (topic selection)
  |
  v
Home Dashboard
```

### 4.4 Therapist Discovery & Booking Flow

```
User Home
  |
  v
Discover Tab
  |-- Search bar (search by name, specialty)
  |-- Specialization filters
  |-- Therapist cards (photo, name, rating, price, specialties)
  |
  v
Therapist Profile
  |-- Full bio and photo
  |-- Specializations
  |-- Reviews and ratings
  |-- Availability calendar
  |-- "Book Session" button
  |
  v
Booking Screen
  |-- Select date
  |-- Select time slot
  |-- Select session type (Video/Audio/Chat)
  |-- Review price
  |-- "Confirm & Pay" button
  |
  v
Payment
  |-- Stripe payment form
  |-- Apply promo code
  |-- Confirm payment
  |
  v
Booking Confirmation
  |-- Appointment details
  |-- Calendar invite option
  |-- "View My Appointments" button
```

### 4.5 Admin Flow

```
Admin Login Screen
  |-- Username
  |-- Password
  |-- Login
  |
  v
Admin Dashboard (sidebar navigation)
  |-- Clients tab --> User management table
  |-- Therapist tab --> Therapist management
  |-- Sessions & Schedule
  |-- Content Management
  |-- Communications
  |-- Compliance
  |-- Financials tab --> Revenue analytics
  |-- Analytics & Reporting
  |-- Promotion & Offers
  |-- Settings
```

---

## 5. Screen-by-Screen Specifications

### 5.1 User Screens

#### 5.1.1 Splash Screen (`splash.tsx`)
- Heali mascot fade-in animation
- App logo
- Auto-redirect after 2 seconds

#### 5.1.2 Marketing Screen (`marketing.tsx`)
- Value propositions with illustrations
- "Get Started" button
- "Already have an account? Login" link

#### 5.1.3 Onboarding Screen (`onboarding.tsx`)
- Gradient top section with Heali image
- Title: "Hi, I'm Heali"
- Question: "What should we call you?"
- Name input field with rounded styling
- Terms & Conditions checkbox with modal
- "Continue" button (disabled until form valid)
- "Existing User? Login" footer link
- Error message display on API failure

#### 5.1.4 Personalisation Screen (`personalisation.tsx`)
- Header with back button, title "What brings you here?", Heali mascot
- Subtitle: "Choose what you'd like to focus on first..."
- 2-column grid of 6 topic cards:
  - Stress (lightning icon)
  - Anxiety (heart icon)
  - Sleep (moon icon)
  - Relationships (people icon)
  - Self-esteem (butterfly icon)
  - Focus (target icon)
- Max 3 selections, error message if exceeded
- "Continue" button (disabled until at least 1 selected)

#### 5.1.5 Home Dashboard (`home.tsx`)
- Dynamic greeting: "Hi, [Name]" / time-based greeting
- Mood tracker (interactive SVG faces with journal expand)
- Upcoming appointments widget
- Therapist discovery cards
- Quick actions: Book Session, Chat with Heali, Browse Content
- Bottom navigation bar (Home, Discover, Care, Profile, More)

#### 5.1.6 Login Screen (`login.tsx`)
- Email input
- Password input with show/hide toggle
- "Forgot Password?" link
- "Login" button
- Google sign-in button
- Apple sign-in button
- "New user? Sign up" link

#### 5.1.7 Phone Verification Screen (`signup/phone-verify.tsx`)
- Country code selector with flags
- Phone number input with formatting (xxx xxx xxxx)
- "Generate OTP" button
- 6-digit OTP input boxes (auto-advance)
- "Verify" button
- Google and Apple social login alternatives
- "Contact Support" link

#### 5.1.8 Contact Details Screen (`signup/contact-details.tsx`)
- Full name
- Email
- Date of birth picker
- Gender selector
- Address
- "Continue" button

#### 5.1.9 Profile Completion Screen (`signup/profile-completion.tsx`)
- Occupation
- Marital status
- Emergency contact name, phone, relationship
- Profile photo upload
- "Complete Profile" button

#### 5.1.10 Profile Success Screen (`signup/profile-success.tsx`)
- Celebration animation (confetti/confetti-style)
- "Welcome to Telehealings!" message
- "Get Started" button

### 5.2 Admin Screens

#### 5.2.1 Admin Login Screen (`admin/login.tsx`)
- Gradient background
- Username input
- Password input
- Error message display
- "Login" button
- No sidebar (standalone page)

#### 5.2.2 Admin Dashboard (`admin/dashboard.tsx`)
- Sidebar navigation (collapsible) with:
  - Dashboard, Therapist, Clients, Sessions & Schedule,
  - Content Management, Communications, Compliance,
  - Financials, Analytics & Reporting, Promotion & Offers
- Header with admin name "Admin"
- User count display
- Search bar
- Filters button
- Export CSV button
- Add User button
- Paginated user table:
  - Columns: User, Joined, T&C Accepted, Topics, Actions
  - Avatar with initial
  - Name and ID
  - Topic badges
  - Row actions (edit/delete/more)
- Pagination with page numbers
- Pull-to-refresh

---

## 6. Feature Specifications

### 6.1 Authentication & Registration

| Feature | Status | Description |
|---|---|---|
| Soft Onboarding | DONE | Name + T&C acceptance, no email/password required |
| Email/Password Signup | Backend done | Supabase Auth integration, creates user in both Supabase Auth and Prisma |
| Email/Password Login | Backend done | Validates credentials via Supabase Auth, returns JWT |
| Phone OTP Send | Planned | Supabase Auth `signInWithOtp`, requires Twilio |
| Phone OTP Verify | Planned | Supabase Auth `verifyOtp`, creates/logs in user |
| Google OAuth | Planned | Supabase Auth social provider |
| Apple OAuth | Planned | Supabase Auth social provider |
| Password Reset | Planned | Email-based reset flow via Supabase |
| Token Verification | DONE | Validates Supabase JWT, returns Prisma user |
| Admin Login | DONE | Local bcrypt-based auth against `admins` table |
| Session Persistence | DONE | Zustand persist with AsyncStorage (mobile) / localStorage (web) |
| Auth State Check | Planned | Validate stored token on app launch |

### 6.2 User Profile Management

| Feature | Status | Description |
|---|---|---|
| View Profile | Planned | Display all profile fields |
| Edit Profile | Planned | Update any profile field |
| Upload Avatar | Planned | Image picker + Supabase Storage upload |
| Delete Account | Planned | Soft delete with confirmation |
| Profile Completion % | Planned | Show completion progress based on filled fields |
| Emergency Contact | Planned | Add/edit emergency contact details |
| Phone Number | Planned | Add/change with OTP verification |

### 6.3 Therapist Features

| Feature | Status | Description |
|---|---|---|
| Therapist Registration | Planned | Signup flow with license verification |
| Therapist Verification | Planned | Admin reviews and approves credentials |
| Profile Management | Planned | Bio, photo, specializations, hourly rate |
| Availability Management | Planned | Set recurring and one-off availability slots |
| Therapist Search | Planned | Search by name, specialty, availability |
| Therapist Discovery | Planned | Browse with filters (rating, price, specialty) |
| Therapist Reviews | Planned | View and submit reviews after sessions |
| Therapist Dashboard | Planned | Appointments, earnings, messages |

### 6.4 Appointments & Scheduling

| Feature | Status | Description |
|---|---|---|
| Therapist Calendar | Planned | View real-time availability |
| Book Appointment | Planned | Select date, time slot, session type |
| Reschedule | Planned | Change date/time of existing appointment |
| Cancel Appointment | Planned | With cancellation policy enforcement |
| Appointment Status | Planned | Pending, Confirmed, In Progress, Completed, Cancelled, No Show |
| Recurring Appointments | Planned | Weekly/bi-weekly booking |
| Reminder Notifications | Planned | Push/email before session |
| Calendar Sync | Planned | Export to Google/Apple Calendar |

### 6.5 Video/Audio Sessions

| Feature | Status | Description |
|---|---|---|
| Video Session | Planned | WebRTC-based video calling |
| Audio Session | Planned | Audio-only option |
| Chat Session | Planned | Text-based therapy session |
| Screen Sharing | Planned | Therapist shares screen |
| Session Timer | Planned | Display elapsed/remaining time |
| Session Notes | Planned | Therapist writes post-session notes |
| Recording | Planned | Optional session recording (with consent) |
| Session Quality | Planned | Bandwidth indicator, reconnect handling |
| Waiting Room | Planned | Pre-session lobby |

### 6.6 Chat & Messaging

| Feature | Status | Description |
|---|---|---|
| Direct Messages | Planned | User-to-therapist messaging |
| Real-time | Planned | Socket.io for instant delivery |
| Read Receipts | Planned | Seen/unseen indicators |
| File Sharing | Planned | Images, documents |
| Message History | Planned | Full conversation history |
| Typing Indicator | Planned | Show when other party is typing |
| Push Notifications | Planned | Alert for new messages |
| Message Search | Planned | Search within conversations |
| Group Chat | Planned | Multi-participant conversations |

### 6.7 Payments

| Feature | Status | Description |
|---|---|---|
| Stripe Integration | Planned | Payment processing via Stripe |
| Card Payments | Planned | Visa, Mastercard, Amex |
| Save Card | Planned | Securely store payment method |
| Pay at Booking | Planned | Charge when booking appointment |
| Refunds | Planned | Full/partial refund processing |
| Subscriptions | Planned | Monthly/weekly therapy plans |
| Invoices | Planned | Auto-generated receipts |
| Promo Codes | Planned | Discount codes at checkout |
| Payment History | Planned | View all past transactions |
| Therapist Payout | Planned | Revenue distribution to therapists |

### 6.8 AI Chatbot (Heali)

| Feature | Status | Description |
|---|---|---|
| Conversational AI | Planned | Natural language chat interface |
| Mood Tracking | Planned | Daily mood logging with visual faces |
| Journaling | Planned | Guided journal prompts |
| Crisis Detection | Planned | Keyword/pattern detection for urgent help |
| Resource Suggestions | Planned | Relevant articles, exercises |
| Conversation History | Planned | View past AI conversations |
| Personality | Planned | Warm, supportive, non-judgmental tone |
| Therapist Escalation | Planned | Recommend booking session when needed |

### 6.9 Mood & Wellness Tracking

| Feature | Status | Description |
|---|---|---|
| Mood Check-in | Planned | Daily mood selection (5-level scale) |
| Mood History | Planned | Calendar view of mood over time |
| Journal Entries | Planned | Free-form text entries |
| Guided Exercises | Planned | Breathing, meditation, CBT exercises |
| Progress Insights | Planned | AI-generated mood patterns |
| Goal Setting | Planned | Set and track wellness goals |
| Streaks | Planned | Track daily engagement |

### 6.10 Content Library

| Feature | Status | Description |
|---|---|---|
| Articles | Planned | Mental health articles by category |
| Videos | Planned | Therapeutic video content |
| Audio | Planned | Guided meditations, sleep stories |
| Bookmarks | Planned | Save content for later |
| Categories | Planned | Anxiety, sleep, relationships, etc.
| Search | Planned | Full-text search across content |
| Recommended | Planned | AI-curated content based on user topics |

### 6.11 Notifications

| Feature | Status | Description |
|---|---|---|
| Push Notifications | Planned | App-level alerts (FCM/APNs) |
| Email Notifications | Planned | Booking confirmations, reminders |
| In-App Bell | Planned | Notification center within app |
| Preferences | Planned | Configure which notifications to receive |
| Reminder Timing | Planned | 24h, 1h before appointment |

### 6.12 Admin Features

| Feature | Status | Description |
|---|---|---|
| Admin Login | DONE | Username/password authentication |
| User Management | DONE | View all users, paginated table |
| User CRUD | Planned | Create, read, update, delete users |
| Search & Filter | Planned | Search by name, filter by role, date |
| Export Data | Planned | CSV export of user data |
| Therapist Verification | Planned | Review and approve license credentials |
| Appointment Oversight | Planned | View all appointments across platform |
| Financial Reports | Planned | Revenue, bookings, therapist earnings |
| Analytics Dashboard | Planned | User growth, retention, engagement metrics |
| Content Management | Planned | CRUD for articles, videos, audio |
| Promo Management | Planned | Create and manage discount codes |
| Audit Logs | Planned | Track all admin actions |
| Platform Settings | Planned | Global configuration (fees, policies) |
| Communication | Planned | Broadcast messages to users/therapists |
| Compliance | Planned | HIPAA compliance tools, data export/delete |

---

## 7. Tech Stack

### 7.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.76.5 | Mobile app framework |
| Expo SDK | 54.0.0 | Development platform, build tools |
| React | 18.3.1 | UI library |
| Expo Router | 4.0.22 | File-based routing |
| TypeScript | Strict | Type safety |
| Zustand | Latest | State management |
| AsyncStorage | Persistent | Local data persistence |
| React Native SVG | 15+ | Custom SVG icons |
| Reanimated | 3.16.7 | Smooth animations |
| expo-linear-gradient | 14+ | Gradient backgrounds |
| expo-constants | Latest | Environment configuration |
| @react-native-async-storage | 2+ | Cross-platform storage |

### 7.2 Backend

| Technology | Version | Purpose |
|---|---|---|
| NestJS | 10.3 | Server framework |
| Node.js | 20+ | Runtime |
| TypeScript | ~5.3 | Type safety |
| Supabase JS | 2.43 | Supabase client (service role) |
| Prisma | 5.22 | ORM for PostgreSQL |
| bcrypt | 5.1 | Password hashing |
| class-validator | 0.14 | Request validation |
| class-transformer | 0.5 | DTO transformation |
| @nestjs/jwt | 10.2 | JWT handling |
| passport-jwt | 4.0 | JWT strategy |
| @nestjs/swagger | 7.3 | API documentation |
| @nestjs/terminus | 10.2 | Health checks |
| helmet | 7.1 | Security headers |
| Stripe | 15 | Payment processing |
| Socket.io | 4.7 | Real-time communication |
| uuid | 9.0 | UUID generation |

### 7.3 Infrastructure

| Technology | Purpose |
|---|---|
| Supabase | PostgreSQL database + Auth + Storage |
| Vercel (planned) | Frontend hosting (web) |
| Railway (planned) | Backend hosting |
| Stripe | Payment processing |
| Twilio (planned) | SMS for phone OTP |
| FCM/APNs (planned) | Push notifications |

---

## 8. System Architecture

### 8.1 High-Level Architecture

```
+--------------------------------------------------+
|                  CLIENT LAYER                     |
|                                                   |
|  +-------------------+   +---------------------+  |
|  |   Mobile App      |   |   Web Admin Portal  |  |
|  | (React Native +   |   | (React Native Web)  |  |
|  |   Expo SDK 54)    |   |                     |  |
|  +--------+----------+   +----------+----------+  |
|           |                         |             |
|           |    REST API (JSON)      |             |
|           +------------+------------+  |
|                        |                        |
+------------------------+------------------------+
                         |
                         v
+--------------------------------------------------+
|                  API GATEWAY                      |
|              (NestJS + Helmet + CORS)            |
|              Global prefix: /api/v1/              |
+--------------------------------------------------+
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
+-----------+   +-----------+   +-----------+
|   Auth     |   |   Users   |   |   Admin   |
|  Module    |   |  Module   |   |  Module   |
+-----------+   +-----------+   +-----------+
          |              |              |
          +--------------+--------------+
                         |
                         v
+--------------------------------------------------+
|                DATA LAYER                         |
|                                                   |
|  +----------------+    +-----------------------+  |
|  |   Prisma ORM   |    |  Supabase JS Client   |  |
|  |   (PostgreSQL) |    |  (Auth + Storage)     |  |
|  +-------+--------+    +-----------+-----------+  |
|          |                         |              |
+----------+-------------------------+--------------+
                         |
                         v
              +---------------------+
              |     Supabase        |
              |  PostgreSQL Database|
              |  Auth Service       |
              |  Storage Service    |
              +---------------------+
```

### 8.2 Authentication Architecture

```
Soft Onboarding:
  Frontend --> POST /api/v1/users/onboard --> Prisma (create user) --> Supabase DB

Email/Password:
  Frontend --> POST /api/v1/auth/signup --> Supabase Auth.signUp --> Supabase DB
          --> Prisma.user.create --> Prisma DB
          --> JWT returned to client

Phone OTP (planned):
  Frontend --> POST /api/v1/auth/otp/send --> Supabase Auth.signInWithOtp --> Twilio SMS
  Frontend --> POST /api/v1/auth/otp/verify --> Supabase Auth.verifyOtp --> JWT returned

Admin Login:
  Frontend --> POST /api/v1/auth/admin/login --> bcrypt.compare --> Prisma DB
          --> Session returned (no JWT for admin)
```

### 8.3 Data Flow

```
User Action --> Frontend Screen --> API Client (fetch)
    --> NestJS Controller --> Validation Pipe (class-validator)
    --> Service Layer --> Prisma ORM / Supabase Client
    --> PostgreSQL / Supabase Auth
    --> Response JSON --> Frontend State Update (Zustand)
    --> UI Re-render
```

---

## 9. Database Schema

### 9.1 Entity Relationship Diagram (Conceptual)

```
users ||--o| user_profiles : has
users ||--o| therapists : can_be
users ||--o{ appointments : books
users ||--o{ payments : makes
users ||--o{ conversation_participants : participates
users ||--o{ chatbot_conversations : has
users ||--o{ audit_logs : generates

therapists ||--o{ appointments : receives
therapists ||--o{ sessions : conducts
therapists ||--o{ reviews : receives
therapists ||--o{ availability_slots : has
therapists ||--o{ therapist_specializations : has

specializations ||--o{ therapist_specializations : categorized

appointments ||--o| sessions : becomes
appointments ||--o| payments : billed_through

sessions ||--o{ session_notes : has
sessions ||--o| reviews : receives

conversations ||--o{ conversation_participants : has
conversations ||--o{ messages : contains

chatbot_conversations ||--o{ chatbot_messages : contains
```

### 9.2 Table Specifications

#### users
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK, default uuid() | Internal user ID |
| supabase_id | TEXT | UNIQUE, nullable | Supabase Auth UID (null for soft-onboarded users) |
| email | TEXT | UNIQUE, nullable | User email |
| name | TEXT | nullable | Display name |
| terms_accepted_at | TIMESTAMPTZ | nullable | When T&C was accepted |
| topics | TEXT[] | default [] | Selected focus topics |
| role | ENUM | default 'USER' | USER, THERAPIST, ADMIN |
| is_active | BOOLEAN | default true | Soft delete flag |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

#### user_profiles
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Profile ID |
| user_id | UUID, FK | UNIQUE, CASCADE | References users.id |
| full_name | TEXT | nullable | Full legal name |
| phone | TEXT | nullable | Phone number |
| date_of_birth | TIMESTAMPTZ | nullable | DOB |
| gender | TEXT | nullable | Gender identity |
| occupation | TEXT | nullable | Job/profession |
| marital_status | TEXT | nullable | Marital status |
| address | TEXT | nullable | Physical address |
| emergency_contact_name | TEXT | nullable | Emergency contact |
| emergency_contact_phone | TEXT | nullable | Emergency phone |
| emergency_contact_relationship | TEXT | nullable | Relationship to user |
| avatar_url | TEXT | nullable | Profile photo URL |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

#### admins
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Admin ID |
| username | TEXT | UNIQUE | Login username |
| password | TEXT | NOT NULL | Bcrypt hashed password |
| created_at | TIMESTAMPTZ | default now() | Record creation |

#### therapists
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Therapist ID |
| user_id | UUID, FK | UNIQUE, CASCADE | References users.id |
| license_number | TEXT | UNIQUE | Professional license |
| years_experience | INTEGER | | Years of practice |
| hourly_rate | DECIMAL(10,2) | | Session price |
| is_verified | BOOLEAN | default false | Admin verified |
| is_available | BOOLEAN | default false | Currently accepting |
| rating | DECIMAL(3,2) | nullable | Average rating |
| total_reviews | INTEGER | default 0 | Review count |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

#### appointments
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Appointment ID |
| user_id | UUID, FK | CASCADE | References users.id |
| therapist_id | UUID, FK | CASCADE | References therapists.id |
| slot_id | UUID, FK | UNIQUE, nullable | References availability_slots.id |
| status | ENUM | default 'PENDING' | PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW |
| notes | TEXT | nullable | User notes |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

#### sessions
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Session ID |
| appointment_id | UUID, FK | UNIQUE, CASCADE | References appointments.id |
| therapist_id | UUID, FK | CASCADE | References therapists.id |
| status | ENUM | default 'SCHEDULED' | SCHEDULED, LIVE, ENDED, CANCELLED |
| started_at | TIMESTAMPTZ | nullable | Actual start time |
| ended_at | TIMESTAMPTZ | nullable | Actual end time |
| video_room_id | TEXT | nullable | WebRTC room identifier |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

#### messages
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Message ID |
| conversation_id | UUID, FK | CASCADE | References conversations.id |
| sender_id | UUID, FK | CASCADE | References users.id |
| content | TEXT | NOT NULL | Message body |
| is_read | BOOLEAN | default false | Read status |
| created_at | TIMESTAMPTZ | default now() | Record creation |

#### payments
| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | Payment ID |
| appointment_id | UUID, FK | UNIQUE, CASCADE | References appointments.id |
| user_id | UUID, FK | CASCADE | References users.id |
| amount | DECIMAL(10,2) | NOT NULL | Charge amount |
| currency | TEXT | default 'USD' | Currency code |
| status | ENUM | default 'PENDING' | PENDING, COMPLETED, FAILED, REFUNDED |
| stripe_id | TEXT | nullable | Stripe payment intent ID |
| refund_id | TEXT | nullable | Stripe refund ID |
| created_at | TIMESTAMPTZ | default now() | Record creation |
| updated_at | TIMESTAMPTZ | auto update | Last modification |

---

## 10. API Specifications

### 10.1 Auth Endpoints

**POST /api/v1/auth/signup**
```json
Request:  { "email": "user@example.com", "password": "securePass123", "role": "USER" }
Response: { "user": { "id": "...", "email": "..." }, "session": { "access_token": "..." } }
```

**POST /api/v1/auth/signin**
```json
Request:  { "email": "user@example.com", "password": "securePass123" }
Response: { "user": { "id": "..." }, "session": { "access_token": "...", "refresh_token": "..." } }
```

**POST /api/v1/auth/admin/login**
```json
Request:  { "username": "admin", "password": "admin123" }
Response: { "id": "...", "username": "admin" }
```

**POST /api/v1/auth/verify**
```json
Request:  { "token": "eyJhbG..." }
Response: { "id": "...", "email": "...", "role": "USER" }
```

### 10.2 User Endpoints

**POST /api/v1/users/onboard**
```json
Request:  { "name": "John", "termsAcceptedAt": "2026-06-05T12:00:00Z", "topics": [] }
Response: { "id": "...", "name": "John", "termsAcceptedAt": "...", "topics": [], "role": "USER", ... }
```

**GET /api/v1/users**
```json
Response: [ { "id": "...", "name": "John", "topics": ["stress"], ... }, ... ]
```

**GET /api/v1/users/:id**
```json
Response: { "id": "...", "name": "John", "email": "...", "topics": [...], ... }
```

**PATCH /api/v1/users/:id**
```json
Request:  { "name": "John Updated", "topics": ["stress", "anxiety"] }
Response: { "id": "...", "name": "John Updated", "topics": ["stress", "anxiety"], ... }
```

**DELETE /api/v1/users/:id**
```
Response: 204 No Content
```

**POST /api/v1/users/:userId/profile**
```json
Request:  { "fullName": "John Doe", "phone": "+1234567890", "gender": "male", ... }
Response: { "id": "...", "userId": "...", "fullName": "John Doe", ... }
```

**GET /api/v1/users/:userId/profile**
```json
Response: { "id": "...", "fullName": "John Doe", "phone": "+1234567890", ... }
```

### 10.3 Planned Endpoints (Not Yet Implemented)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/otp/send` | Send OTP to phone |
| POST | `/api/v1/auth/otp/verify` | Verify OTP code |
| POST | `/api/v1/auth/forgot-password` | Send password reset email |
| POST | `/api/v1/auth/reset-password` | Reset password with token |
| GET | `/api/v1/therapists` | List therapists |
| GET | `/api/v1/therapists/:id` | Get therapist profile |
| POST | `/api/v1/therapists` | Register as therapist |
| PATCH | `/api/v1/therapists/:id` | Update therapist profile |
| GET | `/api/v1/therapists/:id/availability` | Get availability slots |
| POST | `/api/v1/appointments` | Book appointment |
| GET | `/api/v1/appointments` | List user's appointments |
| PATCH | `/api/v1/appointments/:id` | Update appointment |
| DELETE | `/api/v1/appointments/:id` | Cancel appointment |
| POST | `/api/v1/sessions/:id/start` | Start session |
| POST | `/api/v1/sessions/:id/end` | End session |
| GET | `/api/v1/conversations` | List conversations |
| POST | `/api/v1/conversations` | Create conversation |
| GET | `/api/v1/conversations/:id/messages` | Get messages |
| POST | `/api/v1/conversations/:id/messages` | Send message |
| POST | `/api/v1/payments/intent` | Create payment intent |
| POST | `/api/v1/payments/confirm` | Confirm payment |
| GET | `/api/v1/chatbot/conversations` | Get chatbot history |
| POST | `/api/v1/chatbot/message` | Send message to Heali |
| GET | `/api/v1/admin/analytics` | Platform analytics |
| GET | `/api/v1/admin/audit-logs` | Audit trail |

---

## 11. Design System

### 11.1 Colors

| Token | Value | Usage |
|---|---|---|
| Primary | `#387bd5` | Buttons, links, active states |
| Primary Dark | `#1e5ab8` | Headers, accents |
| Primary Light | `#cbe0f9` | Backgrounds, gradients |
| White | `#ffffff` | Cards, backgrounds |
| Text Main | `#0f172a` | Headings |
| Text Body | `#334155` | Body text |
| Text Muted | `#64748b` | Subtitles, placeholders |
| Text Light | `#94a3b8` | Disabled, hints |
| Error | `#dc2626` | Error messages |
| Success | `#16a34a` | Success states |
| Warning | `#f59e0b` | Warnings |
| Border | `#e2e8f0` | Dividers, borders |
| Border Light | `#f1f5f9` | Subtle borders |

### 11.2 Typography

| Style | Size | Weight | Usage |
|---|---|---|---|
| H1 | 26px | 800 | Screen titles |
| H2 | 22px | 700 | Section headers |
| H3 | 18px | 600 | Card titles |
| Body | 14px | 500 | Body text |
| Caption | 12px | 500 | Subtitles, labels |
| Small | 11px | 500 | Fine print |
| Button | 17px | 600 | Button text |

### 11.3 Spacing (8px grid)

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |

### 11.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| sm | 8px | Small elements |
| md | 12px | Cards, inputs |
| lg | 16px | Modals |
| xl | 24px | Large cards |
| pill | 30px | Buttons, search |
| circle | 99px | Avatars, badges |

### 11.5 Shadows

```js
// Card shadow
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.02,
shadowRadius: 15,
elevation: 2,

// Button shadow
shadowColor: '#387bd5',
shadowOffset: { width: 0, height: 8 },
shadowOpacity: 0.18,
shadowRadius: 25,
elevation: 6,
```

### 11.6 Icons

All icons are custom SVG components with consistent coloring:
- Navigation: Dashboard, User, Users, Calendar, Book, Chat, Shield, Dollar, Chart, Tag
- Topics: Stress (lightning), Anxiety (heart), Sleep (moon), Relationships (people), Self-esteem (butterfly), Focus (target)
- UI: Back arrow, Search, Filter, Export, Add, Close, Check, Menu

### 11.7 Animations

| Animation | Description | Usage |
|---|---|---|
| slideFadeUp | Opacity 0→1, translateY 15→0 | Screen entry |
| stagger | 100ms delay between children | List items |
| float | translateY 0→-8 loop | Heali mascot |
| pulse | Scale 1→1.05→1 | Loading states |
| popIn | Scale 0→1 with spring | Success checkmarks |

---

## 12. Implemented Features

### Phase 1 -- Core Infrastructure (Current)

| Feature | Frontend | Backend | Status |
|---|---|---|---|
| Soft Onboarding (name + T&C) | Done | Done | Working |
| Personalisation (topic selection) | Done | Done | Working |
| Admin Login | Done | Done | Working |
| Admin Dashboard (user list) | Done | Done | Working |
| User CRUD API | N/A | Done | Working |
| Profile CRUD API | N/A | Done | Working |
| Email/Password Auth API | UI only | Done | Backend ready |
| Phone OTP UI | Done | Planned | UI only |
| Signup flow screens | Done | Planned | UI only |
| Zustand auth store | Done | N/A | Working |
| API client (auto-detect IP) | Done | N/A | Working |
| Swagger API docs | N/A | Done | Working |
| Database schema | N/A | Done | Working |
| Admin seed script | N/A | Done | Working |

---

## 13. Roadmap & Future Features

### Phase 2 -- Authentication & User Management
- Phone OTP send/verify (Supabase Auth + Twilio)
- Email/password login (frontend wiring)
- Google OAuth integration
- Apple OAuth integration
- Password reset flow
- User profile screen (frontend)
- Auth state validation on app launch

### Phase 3 -- Therapist Features
- Therapist registration flow
- Therapist verification workflow (admin)
- Therapist profile management
- Availability slot management
- Therapist search and discovery
- Therapist detail page
- Therapist dashboard

### Phase 4 -- Appointments & Scheduling
- Appointment booking flow
- Calendar view
- Appointment status management
- Reschedule and cancel
- Appointment notifications
- Recurring appointments

### Phase 5 -- Video/Audio Sessions
- WebRTC video calling
- Audio-only sessions
- Chat-based sessions
- Session timer
- Session notes
- Waiting room

### Phase 6 -- Chat & Messaging
- Real-time messaging (Socket.io)
- Conversation list
- File/image sharing
- Read receipts
- Push notifications for messages

### Phase 7 -- Payments
- Stripe payment integration
- Payment at booking
- Refund processing
- Subscription plans
- Invoice generation
- Promo codes
- Payment history

### Phase 8 -- AI Chatbot (Heali)
- Conversational AI interface
- Mood tracking
- Journaling
- Crisis detection
- Content recommendations
- Conversation history

### Phase 9 -- Admin Features
- Full user CRUD
- Therapist verification
- Analytics dashboard
- Financial reports
- Content management
- Promo management
- Audit logs
- Platform settings

### Phase 10 -- Deployment & DevOps
- CI/CD pipeline
- Production deployment
- Environment management
- Monitoring and alerting
- Database backups
- Performance optimization

---

## 14. Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase account + project

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # Fill in Supabase credentials
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
npm run start:dev        # http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
npm install
npx expo start --clear   # Press w=web, a=Android, i=iOS
```

### Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres.xxx:password@pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxx:password@pooler.supabase.com:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
CORS_ORIGIN=http://localhost:8081
```

**Frontend (.env):**
```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_API_URL=http://172.16.1.189:3001/api/v1
```

---

## 15. Known Issues

1. **Phone "Failed to fetch":** Mobile device cannot reach backend at `localhost:3001`. API client now auto-detects the dev machine IP from `window.location`. Requires `npx expo start --clear` to pick up changes.
2. **Phone OTP not connected:** `phone-verify.tsx` has full UI but no backend integration yet. Requires Twilio configuration in Supabase.
3. **Email/password login not wired:** Backend endpoints exist but frontend login screen doesn't call them yet.
4. **RLS policies:** Supabase Row Level Security policies not yet configured (backend uses service role key which bypasses RLS).
5. **Admin session:** Admin login returns user data but no JWT token. Session management for admin is basic.

---

## 16. Architecture Decision Records

| ADR | Decision | Rationale |
|---|---|---|
| ADR-001 | React Native with Expo | Cross-platform (iOS/Android/Web), single codebase, Expo SDK 54 for stability |
| ADR-002 | NestJS | Modular architecture, TypeScript-native, enterprise-grade patterns |
| ADR-003 | Supabase (PostgreSQL + Auth) | Managed database, built-in auth with multiple providers, RLS, real-time |
| ADR-004 | REST API | Simplicity, well-understood, easy to document with Swagger |
| ADR-005 | Vercel + Railway | Serverless frontend, managed backend hosting, auto-scaling |
| ADR-006 | Prisma | Type-safe ORM, excellent DX, migration support, Supabase compatible |
| ADR-007 | Zustand | Lightweight, no boilerplate, persistence middleware, works with React Native |
| ADR-008 | Expo SDK 54 (pinned) | Avoid breaking changes, exact version control for stability |

---

*Report generated: June 2026*
*Project repository: git@github.com:Shabinmajeed/hermes-telehealings.git*
*Supabase URL: https://cdjxwlirfhpzvuufdult.supabase.co*
