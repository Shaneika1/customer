
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://vqhobmiymmgdiwcsytdn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaG9ibWl5bW1nZGl3Y3N5dGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2ODI1NzAsImV4cCI6MjAzNTI1ODU3MH0.MviXH35lQ1e2j2t_zwej7V77DHHRlfdS7-4sVF2jMCQ')

export default supabase;