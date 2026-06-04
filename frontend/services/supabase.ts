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
