import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yuntqzgwicfxqrfpyrig.supabase.co';
const supabaseAnonKey = 'TA_CLE_ANON_SUPABASE'; // Remplace par ta clé publique

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
