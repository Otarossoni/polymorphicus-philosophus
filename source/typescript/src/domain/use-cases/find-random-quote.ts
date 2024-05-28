import { Either, left, right } from 'src/core/errors/either'

import { Quote } from '../models/database/quote'

import { QuoteRepository } from '../repositories/database/quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FindRandomQuoteUseCaseResponse = Either<
  ResourceNotFoundError,
  { quote: Quote }
>

export class FindRandomQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<FindRandomQuoteUseCaseResponse> {
    const quote = await this.quoteRepository.findRandom()

    if (!quote) {
      return left(new ResourceNotFoundError('Quote'))
    }

    return right({ quote })
  }
}
