import { createClient } from '@supabase/supabase-js';

// Default client configuration for browser environments
const defaultClientConfig = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'clarityx-auth-token'
  }
};

/**
 * Create a Supabase client with optimal configuration for the current platform
 * This can be used in website, electron app, or browser extension
 */
export function createSupabaseClient(
  supabaseUrl, 
  supabaseAnonKey,
  customConfig = {}
) {
  // Merge default config with any custom options
  const config = {
    ...defaultClientConfig,
    ...customConfig,
    auth: {
      ...defaultClientConfig.auth,
      ...(customConfig)?.auth
    }
  };
  
  return createClient(supabaseUrl, supabaseAnonKey, config);
}

// Get the configured Supabase client
export const getSupabaseClient = () => {
  // This is for browser environments
  if (typeof window === 'undefined') {
    throw new Error('This function should only be called in browser environments');
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and anon key must be provided in environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

// Default export for convenient imports
export default getSupabaseClient; 