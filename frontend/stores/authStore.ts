// frontend/stores/authStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { User } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null, token?: string | null) => void;
  checkAuthStatus: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: true,
      setUser: (user, token) => set({ user, accessToken: token ?? null, isLoading: false }),
      checkAuthStatus: async () => {
        // Zustand persist will rehydrate state automatically
        // This is a placeholder for token validation with Supabase
        set({ isLoading: false });
      },
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'telehealings-auth',
      storage: createJSONStorage(() => (Platform.OS === 'web' ? (localStorage as any) : AsyncStorage)),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);
