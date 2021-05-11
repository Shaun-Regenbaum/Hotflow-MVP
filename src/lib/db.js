import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	supabaseUrl = import.meta.env.VITE_SUPABASE_URL,
	supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
