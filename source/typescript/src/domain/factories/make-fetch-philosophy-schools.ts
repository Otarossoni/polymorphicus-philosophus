import { KnexPhilosophySchoolRepository } from '../../infra/database/knex/knex-philosophy-school-repository'

import { FetchPhilosophySchoolsUseCase } from '../use-cases/fetch-philosophy-schools'

export function makeFetchPhilosophySchoolsUseCase() {
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const fetchPhilosophySchoolUseCase = new FetchPhilosophySchoolsUseCase(
    philosophySchoolRepository,
  )

  return fetchPhilosophySchoolUseCase
}
