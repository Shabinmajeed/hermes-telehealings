// frontend/app/index.tsx
import { Redirect } from 'expo-router';
import { useAuthStore } from '../stores/authStore';
import { Role } from '../types';

export default function Index() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return null;

  // Returning user -- go straight to home
  if (user) {
    switch (user.role) {
      case Role.USER:
      case Role.THERAPIST:
        return <Redirect href="/(user)/home" />;
      case Role.ADMIN:
        return <Redirect href="/admin/dashboard" />;
      default:
        return <Redirect href="/(auth)/login" />;
    }
  }

  // New user -- start onboarding flow
  return <Redirect href="/(user)/splash" />;
}
