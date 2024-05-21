import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createPhilosophySchool } from './create-philosophy-school'

export async function philosophySchoolRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/school', createPhilosophySchool)
}
