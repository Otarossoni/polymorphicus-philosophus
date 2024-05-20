import { KnexPhilosophySchoolRepository } from '../../infra/database/knex/knex-philosophy-school-repository'

import { CreatePhilosophySchoolUseCase } from '../use-cases/create-philosophy-school'

export function makePhilosophySchoolUseCase() {
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const createPhilosophySchool = new CreatePhilosophySchoolUseCase(
    philosophySchoolRepository,
  )

  return createPhilosophySchool
}
