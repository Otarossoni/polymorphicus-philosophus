import { Quote } from 'src/domain/models/database/quote'

export interface QuoteRepository {
  findByAll(): Promise<Quote[]>
  findRandom(): Promise<Quote | null>
  create(data: Quote): Promise<Quote>
}
