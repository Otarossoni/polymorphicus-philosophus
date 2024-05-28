import { randomUUID } from 'node:crypto'

import { Quote } from '../../../src/domain/models/database/quote'
import { QuoteRepository } from '../../../src/domain/repositories/database/quote-repository'

export class InMemoryQuoteRepository implements QuoteRepository {
  public items: Quote[] = []

  async findByAll(): Promise<Quote[]> {
    return this.items
  }

  async create(data: Quote): Promise<Quote> {
    const newQuote: Quote = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(newQuote)

    return newQuote
  }
}
