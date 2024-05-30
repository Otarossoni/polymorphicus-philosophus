import { DailyQuote } from 'src/domain/models/database/daily-quote'
import { DailyQuoteRepository } from 'src/domain/repositories/database/daily-quote-repository'

export class InMemoryDailyQuoteRepository implements DailyQuoteRepository {
  public items: DailyQuote[] = []

  async findOne(): Promise<DailyQuote | null> {
    const mostRecentQuote = this.items.reduce((latest, current) => {
      return current.day > latest.day ? current : latest
    }, this.items[0])

    return mostRecentQuote
  }

  async create(data: DailyQuote): Promise<DailyQuote> {
    const newPhilosopher: DailyQuote = data

    this.items.push(newPhilosopher)

    return newPhilosopher
  }
}
