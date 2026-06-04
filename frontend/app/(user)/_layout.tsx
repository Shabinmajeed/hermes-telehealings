// frontend/app/(user)/_layout.tsx
import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" />
      <Stack.Screen name="marketing" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="personalisation" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
