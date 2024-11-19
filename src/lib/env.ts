import { createEnv } from '@t3-oss/env-nextjs'
import { config } from 'dotenv'
import { z } from 'zod'

config({ path: '.env.local' })

export const env = createEnv({
  server: {
    NODE_ENV: z.string().default('development'),
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
