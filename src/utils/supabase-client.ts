import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
