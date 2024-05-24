import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { QuoteRepository } from '../../../domain/repositories/database/quote-repository'

import { Quote } from '../../../domain/models/database/quote'

const QUOTE_TABLE = 'public.quote'

export class KnexQuoteRepository implements QuoteRepository {
  async create(data: Quote): Promise<Quote> {
    const newQuote: Quote = { id: randomUUID(), ...data }

    await knex(QUOTE_TABLE)
      .insert(newQuote)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newQuote
  }
}
