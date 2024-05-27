import { KnexPhilosophySchoolRepository } from '../../infra/database/knex/knex-philosophy-school-repository'

import { FindPhilosophySchoolByIdUseCase } from '../use-cases/find-philosophy-school-by-id'

export function makeFindPhilosophySchoolUseCase() {
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const findPhilosophySchoolByIdUseCase = new FindPhilosophySchoolByIdUseCase(
    philosophySchoolRepository,
  )

  return findPhilosophySchoolByIdUseCase
}
