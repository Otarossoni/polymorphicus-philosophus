import { FastifyInstance } from 'fastify'

import { createPhilosophySchool } from './create-philosophy-school'

export async function philosophySchoolRoutes(app: FastifyInstance) {
  app.post('/school', createPhilosophySchool)
}
