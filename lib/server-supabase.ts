import { createClient } from "@supabase/supabase-js";

export const serverSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "demo-service-role-key";
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};
