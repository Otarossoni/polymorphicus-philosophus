import { knex } from '../database'

import { DailyQuoteRepository } from 'src/domain/repositories/database/daily-quote-repository'
import { DailyQuote } from 'src/domain/models/database/daily-quote'

const DAILY_QUOTE_TABLE = 'public.daily_quote'

export class KnexDailyQuoteRepository implements DailyQuoteRepository {
  async findOne(): Promise<DailyQuote | null> {
    const [dailyQuote]: DailyQuote[] = await knex
      .select('*')
      .from(DAILY_QUOTE_TABLE)
      .orderByRaw('day DESC')

    return dailyQuote
  }

  async create(data: DailyQuote): Promise<DailyQuote> {
    const newDailyQuote: DailyQuote = { ...data }

    await knex(DAILY_QUOTE_TABLE)
      .insert(newDailyQuote)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newDailyQuote
  }
}
