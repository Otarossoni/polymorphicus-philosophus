import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createPhilosopher } from './create-philosopher'

export async function philosopherRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/philosopher', createPhilosopher)
}
