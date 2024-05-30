import { KnexQuoteRepository } from 'src/infra/database/knex/knex-quote-repository'
import { KnexPhilosopherRepository } from 'src/infra/database/knex/knex-philosopher-repository'

import { CreateQuoteListUseCase } from '../use-cases/create-quote-list'

export function makeCreateQuoteListUseCase() {
  const quoteRepository = new KnexQuoteRepository()
  const philosopherRepository = new KnexPhilosopherRepository()

  const createQuoteListUseCase = new CreateQuoteListUseCase(
    quoteRepository,
    philosopherRepository,
  )

  return createQuoteListUseCase
}
