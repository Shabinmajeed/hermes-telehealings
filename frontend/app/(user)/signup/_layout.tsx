// frontend/app/(user)/signup/_layout.tsx
import { Stack } from 'expo-router';

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="phone-verify" />
      <Stack.Screen name="profile-completion" />
      <Stack.Screen name="contact-details" />
      <Stack.Screen name="profile-success" />
    </Stack>
  );
}
