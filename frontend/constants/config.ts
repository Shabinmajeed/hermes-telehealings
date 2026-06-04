// frontend/constants/config.ts
import Constants from 'expo-constants';

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3001/api/v1';

export const SUPABASE_URL =
  Constants.expoConfig?.extra?.supabaseUrl || '';

export const SUPABASE_ANON_KEY =
  Constants.expoConfig?.extra?.supabaseAnonKey || '';

export const STRIPE_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.stripeKey || '';
