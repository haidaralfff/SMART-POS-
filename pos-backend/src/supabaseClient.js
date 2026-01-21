import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

function initSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_KEY are required in .env file');
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  
  return supabaseInstance;
}

export const supabase = new Proxy({}, {
  get(target, prop) {
    return initSupabase()[prop];
  }
});
