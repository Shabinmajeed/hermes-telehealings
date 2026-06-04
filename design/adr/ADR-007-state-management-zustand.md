# ADR-007: State Management -- Zustand

## Status
Accepted

## Context
The React Native + Expo frontend needs a lightweight, TypeScript-friendly state management solution for auth state, user profiles, appointments, chat messages, and session data.

## Decision
Use **Zustand** for client-side state management.

## Consequences
- **Positive:** Minimal boilerplate compared to Redux. No providers, no actions/reducers boilerplate.
- **Positive:** TypeScript-first with excellent type inference.
- **Positive:** Small bundle size (~1KB) -- important for mobile performance.
- **Positive:** Works seamlessly with React Native (no web-only dependencies).
- **Positive:** Supports persistence middleware (e.g., persist auth state to AsyncStorage).
- **Positive:** Easy to create multiple small stores by domain (auth, appointments, chat, etc.).
- **Negative:** Less mature devtools compared to Redux DevTools (though Zustand has its own).
- **Negative:** No enforced patterns like Redux -- team discipline needed to keep stores organized.

## Alternatives Considered
- **React Context + useReducer:** Built-in but causes unnecessary re-renders at scale. Fine for small apps, not ideal for a multi-feature platform.
- **Redux Toolkit:** Powerful but heavy boilerplate. Overkill unless we need time-travel debugging or middleware chains.
- **Jotai/Recoil:** Atomic model is interesting but less proven in React Native.
