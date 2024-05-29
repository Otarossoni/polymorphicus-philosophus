import { Either, left, right } from 'src/core/errors/either'

import { DailyQuote } from '../models/database/daily-quote'

import { DailyQuoteRepository } from '../repositories/database/daily-quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FindDailyQuoteUseCaseResponse = Either<
  ResourceNotFoundError,
  { dailyQuote: DailyQuote }
>

export class FindDailyQuoteUseCase {
  constructor(private dailyQuoteRepository: DailyQuoteRepository) {}

  async execute(): Promise<FindDailyQuoteUseCaseResponse> {
    const dailyQuote = await this.dailyQuoteRepository.findOne()

    if (!dailyQuote) {
      return left(new ResourceNotFoundError('Daily Quote'))
    }

    return right({ dailyQuote })
  }
}
