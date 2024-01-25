import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ygeixihnpbepnxudrqle.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZWl4aWhucGJlcG54dWRycWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzI2NzIsImV4cCI6MjAxODgwODY3Mn0.AMyIv8yA0FHSAqCVBXVc7BbDtWYGc_j51JQOvFL7vpw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
