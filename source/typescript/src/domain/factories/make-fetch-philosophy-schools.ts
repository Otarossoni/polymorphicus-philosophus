import { KnexPhilosophySchoolRepository } from '../../infra/database/knex/knex-philosophy-school-repository'

import { FetchPhilosophySchoolUseCase } from '../use-cases/fetch-schools'

export function makeFetchPhilosophySchoolUseCase() {
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const fetchPhilosophySchoolUseCase = new FetchPhilosophySchoolUseCase(
    philosophySchoolRepository,
  )

  return fetchPhilosophySchoolUseCase
}
