import { KnexQuoteRepository } from 'src/infra/database/knex/knex-quote-repository'

import { FindRandomQuoteUseCase } from '../use-cases/find-random-quote'

export function makeFindRandomQuoteUseCase() {
  const quoteRepository = new KnexQuoteRepository()

  const findRandomQuoteUseCase = new FindRandomQuoteUseCase(quoteRepository)

  return findRandomQuoteUseCase
}
