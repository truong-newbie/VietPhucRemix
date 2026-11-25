import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig, hasSupabaseConfig } from '../config/env';

let cachedClient = null;

export function getSupabaseClient() {
  if (!hasSupabaseConfig()) return null;
  if (cachedClient) return cachedClient;
  const { url, anonKey } = getSupabaseConfig();
  cachedClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
  return cachedClient;
}
