import { KnexQuoteRepository } from 'src/infra/database/knex/knex-quote-repository'

import { RenewDailyQuoteUseCase } from '../use-cases/renew-daily-quote'
import { KnexDailyQuoteRepository } from 'src/infra/database/knex/knex-daily-quote-repository'

export function makeRenewDailyQuoteUseCase() {
  const quoteRepository = new KnexQuoteRepository()
  const quoteDailyRepository = new KnexDailyQuoteRepository()

  const findRandomQuoteUseCase = new RenewDailyQuoteUseCase(
    quoteRepository,
    quoteDailyRepository,
  )

  return findRandomQuoteUseCase
}
