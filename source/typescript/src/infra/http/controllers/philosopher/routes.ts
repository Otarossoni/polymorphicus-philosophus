import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { fetchPhilosophers } from './fetch-philosophers'
import { fetchPhilosophersSwagger } from './fetch-philosophers.swagger'

import { findPhilosopherById } from './find-philosopher-by-id'
import { findPhilosopherByIdSwagger } from './find-philosopher-by-id.swagger'

import { createPhilosopher } from './create-philosopher'
import { createPhilosopherSwagger } from './create-philosopher.swagger'

import { linkPhilosopherToPhilosophySchool } from './link-philosopher-to-philosophy-school'
import { linkPhilosopherToPhilosophySchoolSwagger } from './link-philosopher-to-philosophy-school.swagger'

export async function philosopherRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get(
    '/philosopher',
    { schema: fetchPhilosophersSwagger },
    fetchPhilosophers,
  )

  app.get(
    '/philosopher/:id',
    { schema: findPhilosopherByIdSwagger },
    findPhilosopherById,
  )

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
