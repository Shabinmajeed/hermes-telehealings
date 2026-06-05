// frontend/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- User operations ----

export interface OnboardUserData {
  name: string;
  terms_accepted_at: string;
  topics: string[];
}

export async function createUser(data: OnboardUserData) {
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      name: data.name,
      terms_accepted_at: data.terms_accepted_at,
      topics: data.topics,
    })
    .select()
    .single();

  if (error) throw error;
  return user;
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// ---- Admin operations ----

export async function adminLogin(username: string, password: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error) {
    console.error('Admin login error:', error.message);
    throw error;
  }
  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ---- Sign-up flow operations ----

export interface SignupProfileData {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  gender?: string;
  occupation?: string;
  marital_status?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  avatar_url?: string;
}

export async function updateUserProfile(data: SignupProfileData) {
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: data.user_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.date_of_birth || null,
      gender: data.gender || null,
      occupation: data.occupation || null,
      marital_status: data.marital_status || null,
      address: data.address || null,
      emergency_contact_name: data.emergency_contact_name || null,
      emergency_contact_phone: data.emergency_contact_phone || null,
      emergency_contact_relationship: data.emergency_contact_relationship || null,
      avatar_url: data.avatar_url || null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return profile;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}
