// supabase-config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Your Supabase project URL and anon key (from Project Settings → API)
const SUPABASE_URL = "'https://YOUR_PROJECT_ID.supabase.co';https://ksyaxxgozratsjyyrfus.supabase.co/rest/v1/"//'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeWF4eGdvenJhdHNqeXlyZnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTM4OTgsImV4cCI6MjA5NTQyOTg5OH0.cd9LqQFKRhQiYLuDdz-ru6CDounQiBY-hj_XPLBMRMM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
