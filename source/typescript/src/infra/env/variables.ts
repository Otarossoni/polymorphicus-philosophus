import { config } from 'dotenv'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3140),
  DB_CONNECTION_STRING: z.string(),
  JWT_SECRET: z.string(),
})

export function loadEnvironmentVariables() {
  const testEnvironmentPath = '.env.test'
  const productionEnvironmentPath = '.env'

  process.env.NODE_ENV === 'test'
    ? config({ path: testEnvironmentPath })
    : config({ path: productionEnvironmentPath })

  const _env = envSchema.safeParse(process.env)

  if (_env.success === false) {
    console.error(_env.error)
    throw new Error('Invalid environment variables')
  }

  return _env.data
}

export const env = loadEnvironmentVariables()

export type EnvironmentVariables = z.infer<typeof envSchema>
