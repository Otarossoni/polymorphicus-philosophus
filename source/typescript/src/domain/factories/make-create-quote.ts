import { KnexQuoteRepository } from 'src/infra/database/knex/knex-quote-repository'
import { KnexPhilosopherRepository } from 'src/infra/database/knex/knex-philosopher-repository'

import { CreateQuoteUseCase } from '../use-cases/create-quote'

export function makeCreateQuoteUseCase() {
  const quoteRepository = new KnexQuoteRepository()
  const philosopherRepository = new KnexPhilosopherRepository()

  const createQuoteUseCase = new CreateQuoteUseCase(
    quoteRepository,
    philosopherRepository,
  )

  return createQuoteUseCase
}
