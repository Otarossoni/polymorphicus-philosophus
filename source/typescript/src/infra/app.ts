import { FastifyInstance, fastify } from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'
import { authRoutes } from './http/controllers/authentication/routes'
import { env } from './env/variables'

export const app: FastifyInstance = fastify()

app.register(cors, {
  origin: true,
})

app.register(healthCheckRoutes, { prefix: 'api' })
app.register(authRoutes, { prefix: 'api' })

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error. ',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Ferramenta externa de log
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
