import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'

import { CreatePhilosopherUseCase } from '../use-cases/create-philosopher'

export function makePhilosopherUseCase() {
  const philosophySchoolRepository = new KnexPhilosopherRepository()

  const createPhilosopher = new CreatePhilosopherUseCase(
    philosophySchoolRepository,
  )

  return createPhilosopher
}
