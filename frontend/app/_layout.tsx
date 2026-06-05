// frontend/app/_layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, Image as RNImage } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { Colors } from '../constants/theme';

// Fix for web: prevent global Image constructor conflict
if (typeof window !== 'undefined' && typeof window.Image === 'function') {
  const OriginalImage = window.Image;
  // @ts-ignore
  window.Image = function (...args: any[]) {
    return new OriginalImage(...args);
  };
  // @ts-ignore
  window.Image.prototype = OriginalImage.prototype;
}

export default function RootLayout() {
  const { user, isLoading, checkAuthStatus } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Global Auth Guard to prevent deep-linking bypasses
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAdminGroup = segments[0] === 'admin';

    // Allow unauthenticated users to view the onboarding flow inside the (user) group
    const isPublicUserRoute =
      segments[0] === '(user)' &&
      ['splash', 'marketing', 'onboarding', 'personalisation', 'home', 'signup'].includes(segments[1] ?? '');

    if (!user && !inAuthGroup && !inAdminGroup && !isPublicUserRoute) {
      router.replace('/(auth)/login');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(user)" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}
