import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'
import { KnexPhilosopherSchoolRepository } from 'src/infra/database/knex/knex-philosopher-school-repository'
import { KnexPhilosophySchoolRepository } from 'src/infra/database/knex/knex-philosophy-school-repository'

import { CreatePhilosopherUseCase } from '../use-cases/create-philosopher'

export function makePhilosopherUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()
  const philosopherSchoolRepository = new KnexPhilosopherSchoolRepository()
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const createPhilosopher = new CreatePhilosopherUseCase(
    philosopherRepository,
    philosopherSchoolRepository,
    philosophySchoolRepository,
  )

  return createPhilosopher
}
