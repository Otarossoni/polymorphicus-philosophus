import { KnexPhilosopherRepository } from 'src/infra/database/knex/knex-philosopher-repository'

import { FetchPhilosophersUseCase } from '../use-cases/fetch-philosophers'

export function makeFetchPhilosophersUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()

  const fetchPhilosophersUseCase = new FetchPhilosophersUseCase(
    philosopherRepository,
  )

  return fetchPhilosophersUseCase
}
