import { z } from "zod";

const envSchema = z.object({
  GEMINI_API_KEY: z.string().optional(),
  APP_URL: z.string().optional(),
  VITE_GOOGLE_MAPS_API_KEY: z.string().optional(),
  VITE_VAPI_PUBLIC_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  BIGQUERY_PROJECT_ID: z.string().optional(),
  ALLOYDB_HOST: z.string().optional(),
  ALLOYDB_USER: z.string().optional(),
  ALLOYDB_PASSWORD: z.string().optional(),
  ALLOYDB_DB: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (): Env => {
  const envObj = {
    GEMINI_API_KEY: typeof process !== "undefined" ? process.env?.GEMINI_API_KEY : undefined,
    APP_URL: typeof process !== "undefined" ? process.env?.APP_URL : undefined,
    VITE_GOOGLE_MAPS_API_KEY: (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY,
    VITE_VAPI_PUBLIC_KEY: (import.meta as any).env?.VITE_VAPI_PUBLIC_KEY,
    TWILIO_ACCOUNT_SID: typeof process !== "undefined" ? process.env?.TWILIO_ACCOUNT_SID : undefined,
    TWILIO_AUTH_TOKEN: typeof process !== "undefined" ? process.env?.TWILIO_AUTH_TOKEN : undefined,
    TWILIO_PHONE_NUMBER: typeof process !== "undefined" ? process.env?.TWILIO_PHONE_NUMBER : undefined,
    BIGQUERY_PROJECT_ID: typeof process !== "undefined" ? process.env?.BIGQUERY_PROJECT_ID : undefined,
    ALLOYDB_HOST: typeof process !== "undefined" ? process.env?.ALLOYDB_HOST : undefined,
    ALLOYDB_USER: typeof process !== "undefined" ? process.env?.ALLOYDB_USER : undefined,
    ALLOYDB_PASSWORD: typeof process !== "undefined" ? process.env?.ALLOYDB_PASSWORD : undefined,
    ALLOYDB_DB: typeof process !== "undefined" ? process.env?.ALLOYDB_DB : undefined,
  };

  const result = envSchema.safeParse(envObj);
  if (!result.success) {
    console.warn("⚠️ Synapse Environment validation completed with structural errors:", result.error.format());
    return envObj;
  }
  return result.data;
};

export const env = validateEnv();
