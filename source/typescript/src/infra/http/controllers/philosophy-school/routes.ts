import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createPhilosophySchool } from './create-philosophy-school'
import { createPhilosophySchoolSwagger } from './create-philosophy-school.swagger'

import { fetchPhilosophySchools } from './fetch-philosophy-schools'
import { fetchPhilosophySchoolsSwagger } from './fetch-philosophy-schools.swagger'

export async function philosophySchoolRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/school',
    { schema: fetchPhilosophySchoolsSwagger },
    fetchPhilosophySchools,
  )

  app.post(
    '/school',
    { schema: createPhilosophySchoolSwagger },
    createPhilosophySchool,
  )
}
