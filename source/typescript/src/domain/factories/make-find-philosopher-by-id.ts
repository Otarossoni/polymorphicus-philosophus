import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'

import { FindPhilosopherByIdUseCase } from '../use-cases/find-philosopher-by-id'

export function makeFindPhilosopherByIdUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()

  const findPhilosopherByIdUseCase = new FindPhilosopherByIdUseCase(
    philosopherRepository,
  )

  return findPhilosopherByIdUseCase
}
