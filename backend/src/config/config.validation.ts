// backend/src/config/config.validation.ts

interface ConfigShape {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_JWT_SECRET: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  CORS_ORIGIN?: string;
}

const requiredKeys: (keyof ConfigShape)[] = [
  'DATABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_JWT_SECRET',
];

export function validateConfig(config: Record<string, string | undefined>): ConfigShape {
  const missing = requiredKeys.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return {
    NODE_ENV: config.NODE_ENV || 'development',
    PORT: config.PORT || '3001',
    DATABASE_URL: config.DATABASE_URL!,
    SUPABASE_URL: config.SUPABASE_URL!,
    SUPABASE_ANON_KEY: config.SUPABASE_ANON_KEY!,
    SUPABASE_SERVICE_ROLE_KEY: config.SUPABASE_SERVICE_ROLE_KEY!,
    SUPABASE_JWT_SECRET: config.SUPABASE_JWT_SECRET!,
    STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: config.STRIPE_WEBHOOK_SECRET,
    CORS_ORIGIN: config.CORS_ORIGIN,
  };
}
