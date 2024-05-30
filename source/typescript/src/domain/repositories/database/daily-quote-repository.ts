import { DailyQuote } from 'src/domain/models/database/daily-quote'

export interface DailyQuoteRepository {
  findOne(): Promise<DailyQuote | null>
  create(data: DailyQuote): Promise<DailyQuote>
}
