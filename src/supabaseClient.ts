import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yuntqzgwicfxqrfpyrig.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bnRxemd3aWNmeHFyZnB5cmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDUxNjIsImV4cCI6MjA2MzA4MTE2Mn0.zks1E-PxcPriGmS5ObdHBuCXYoXi6frgYRNLPtFgzqg'; // Remplace par ta vraie clé anonyme !

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
