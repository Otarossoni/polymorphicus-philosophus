import { Quote } from 'src/domain/models/database/quote'

export interface QuoteRepository {
  findByAll(): Promise<Quote[]>
  create(data: Quote): Promise<Quote>
}
