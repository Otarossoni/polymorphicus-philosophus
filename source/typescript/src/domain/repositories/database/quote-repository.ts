import { Quote } from 'src/domain/models/database/quote'

export interface QuoteRepository {
  create(data: Quote): Promise<Quote>
}
