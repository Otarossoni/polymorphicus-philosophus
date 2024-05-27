import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { fetchPhilosophySchools } from './fetch-philosophy-schools'
import { fetchPhilosophySchoolsSwagger } from './fetch-philosophy-schools.swagger'

import { findPhilosophySchool } from './find-philosophy-school'
import { findPhilosophySchoolByIdSwagger } from './find-philosophy-school-by-id.swagger'

import { createPhilosophySchool } from './create-philosophy-school'
import { createPhilosophySchoolSwagger } from './create-philosophy-school.swagger'

export async function philosophySchoolRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/school',
    { schema: fetchPhilosophySchoolsSwagger },
    fetchPhilosophySchools,
  )

  app.get(
    '/school/:id',
    { schema: findPhilosophySchoolByIdSwagger },
    findPhilosophySchool,
  )

  app.post(
    '/school',
    { schema: createPhilosophySchoolSwagger },
    createPhilosophySchool,
  )
}
