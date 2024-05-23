import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createPhilosopher } from './create-philosopher'
import { createPhilosopherSwagger } from './create-philosopher.swagger'

import { linkPhilosopherToPhilosophySchool } from './link-philosopher-to-philosophy-school'
import { linkPhilosopherToPhilosophySchoolSwagger } from './link-philosopher-to-philosophy-school.swagger'

export async function philosopherRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/philosopher',
    { schema: createPhilosopherSwagger },
    createPhilosopher,
  )

  app.post(
    '/philosopher/link',
    { schema: linkPhilosopherToPhilosophySchoolSwagger },
    linkPhilosopherToPhilosophySchool,
  )
}
