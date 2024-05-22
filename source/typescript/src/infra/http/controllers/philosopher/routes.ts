import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createPhilosopher } from './create-philosopher'
import { createPhilosopherSwagger } from './create-philosopher.swagger'

export async function philosopherRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/philosopher',
    { schema: createPhilosopherSwagger },
    createPhilosopher,
  )
}
