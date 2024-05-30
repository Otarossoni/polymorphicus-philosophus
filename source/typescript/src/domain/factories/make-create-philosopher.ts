import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'

import { CreatePhilosopherUseCase } from '../use-cases/create-philosopher'

export function makeCreatePhilosopherUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()

  const createPhilosopherUseCase = new CreatePhilosopherUseCase(
    philosopherRepository,
  )

  return createPhilosopherUseCase
}
