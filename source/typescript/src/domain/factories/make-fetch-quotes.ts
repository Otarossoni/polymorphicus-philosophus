import { KnexQuoteRepository } from 'src/infra/database/knex/knex-quote-repository'

import { FetchQuotesUseCase } from '../use-cases/fetch-quotes'

export function makeFetchQuotesUseCase() {
  const quoteRepository = new KnexQuoteRepository()

  const fetchQuotesUseCase = new FetchQuotesUseCase(quoteRepository)

  return fetchQuotesUseCase
}
