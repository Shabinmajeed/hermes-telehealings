# ADR-008: Expo SDK Version -- SDK 54

## Status
Accepted

## Context
The user's mobile device requires Expo SDK 54 for compatibility. SDK 54 ships with React Native 0.81.5, targets Android 16 (API 36), and enables the New Architecture by default.

## Decision
Use **Expo SDK 54** with React Native 0.81.5.

## Consequences
- **Positive:** Compatible with user's device and the latest Android 16.
- **Positive:** New Architecture enabled by default (improved performance, JSI bindings).
- **Positive:** Precompiled React Native binaries for faster iOS builds.
- **Negative:** Some third-party libraries may not yet support RN 0.81. We pin versions carefully.
- **Negative:** Edge-to-edge is mandatory on Android 16. We use `react-native-safe-area-context` to handle insets properly.
- **Dependency changes from SDK 51:**
  - `react-native`: 0.74.0 → 0.81.5
  - `react-native-safe-area-context`: 4.10.0 → 5.0.0
  - `react-native-screens`: 3.31.0 → 4.0.0
  - `@react-native-async-storage/async-storage`: 1.23.1 → 2.1.0
  - `expo-av`: ~14.0.0 → ~15.0.0
  - `jest-expo`: ~51.0.0 → ~54.0.0

## Migration Notes
- Run `npx expo install --fix` after updating package.json to ensure all expo-managed packages align.
- Test on device before committing dependency lock files.
