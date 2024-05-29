import { KnexDailyQuoteRepository } from 'src/infra/database/knex/knex-daily-quote-repository'

import { FindDailyQuoteUseCase } from '../use-cases/find-daily-quote'

export function makeFindDailyQuoteUseCase() {
  const dailyQuoteRepository = new KnexDailyQuoteRepository()

  const findDailyQuoteUseCase = new FindDailyQuoteUseCase(dailyQuoteRepository)

  return findDailyQuoteUseCase
}
