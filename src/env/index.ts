import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PRISMIC_ENDPOINT: z.string(),
  PRISMIC_ACCESS_TOKEN: z.string(),
  // JWT_SECRET_KEY: z.string(),
  // SMTP_HOST: z.string(),
  // SMTP_PORT: z.number(),
  // SMTP_USER: z.string(),
  // SMTP_PASSWORD: z.string(),
  // SMTP_FROM_EMAIL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format)

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
