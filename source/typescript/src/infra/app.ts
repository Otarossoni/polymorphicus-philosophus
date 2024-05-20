import { FastifyInstance, fastify } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import { ZodError } from 'zod'

import { env } from './env/variables'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'
import { authRoutes } from './http/controllers/authentication/routes'
import { philosophySchoolRoutes } from './http/controllers/philosophy-school/routes'

export const app: FastifyInstance = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '30m',
  },
})

app.register(fastifyCors, {
  origin: true,
})

app.register(healthCheckRoutes, { prefix: 'api' })
app.register(authRoutes, { prefix: 'api' })
app.register(philosophySchoolRoutes, { prefix: 'api' })

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
