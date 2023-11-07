import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NEXTAUTH_SECRET: z.string(),
  PERMISSION_ACCOUNTS: z.string().default('henriquesydneylima@gmail.com'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format)

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
