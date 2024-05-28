import { Either, right } from 'src/core/errors/either'

import { Quote } from '../models/database/quote'

import { QuoteRepository } from '../repositories/database/quote-repository'

type FetchQuotesUseCaseResponse = Either<null, { quotes: Quote[] }>

export class FetchQuotesUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<FetchQuotesUseCaseResponse> {
    const quotes = await this.quoteRepository.findByAll()

    return right({ quotes })
  }
}
