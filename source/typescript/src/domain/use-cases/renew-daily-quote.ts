import { Either, left, right } from 'src/core/errors/either'

import { QuoteRepository } from '../repositories/database/quote-repository'
import { DailyQuoteRepository } from '../repositories/database/daily-quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

type RenewDailyQuoteUseCaseResponse = Either<ResourceNotFoundError, null>

export class RenewDailyQuoteUseCase {
  constructor(
    private quoteRepository: QuoteRepository,
    private dailyQuoteRepository: DailyQuoteRepository,
  ) {}

  async execute(): Promise<RenewDailyQuoteUseCaseResponse> {
    const newDailyQuote = await this.quoteRepository.findRandom()

    if (!newDailyQuote) {
      return left(new ResourceNotFoundError('Quote'))
    }

    await this.dailyQuoteRepository.create({
      quote: newDailyQuote.phrase,
      day: new Date(),
    })

    return right(null)
  }
}
