import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase project URL and anon key.
// It's recommended to use environment variables for this in a real project.
const supabaseUrl = 'https://gcpilqfvwvriwdeqtgit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGlsdWZ2d3ZyaXdkZXF0Z2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2Mjg3MDAsImV4cCI6MjAzMzIwNDcwMH0.9pAn0d1M3c3aA2q_8MTIe-n3-sOQLo-f0f-Iq2y3VGU';

if (supabaseUrl === 'https://gcpilqfvwvriwdeqtgit.supabase.co') {
  console.warn(`Supabase credentials are using example values. Please replace them with your project's URL and anon key in services/supabaseClient.ts to enable sign-in and data storage.`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);