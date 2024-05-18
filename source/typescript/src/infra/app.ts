import { FastifyInstance, fastify } from 'fastify'
import cors from '@fastify/cors'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'

export const app: FastifyInstance = fastify()

app.register(cors, {
  origin: true,
})

app.register(healthCheckRoutes)
