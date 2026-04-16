export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
);
