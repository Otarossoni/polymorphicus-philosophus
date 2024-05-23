import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'
import { KnexPhilosopherSchoolRepository } from 'src/infra/database/knex/knex-philosopher-school-repository'

import { CreatePhilosopherUseCase } from '../use-cases/create-philosopher'

export function makePhilosopherUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()
  const philosopherSchoolRepository = new KnexPhilosopherSchoolRepository()

  const createPhilosopher = new CreatePhilosopherUseCase(
    philosopherRepository,
    philosopherSchoolRepository,
  )

  return createPhilosopher
}
