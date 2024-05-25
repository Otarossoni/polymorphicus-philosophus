import { Either, left, right } from 'src/core/errors/either'

import { Quote } from '../models/database/quote'
import { Philosopher } from '../models/database/philosopher'

import { QuoteRepository } from '../repositories/database/quote-repository'
import { PhilosopherRepository } from '../repositories/database/philosopher-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateQuoteListUseCaseRequest {
  philosopher_id: string
  phrases: string[]
}

type CreateQuoteListUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    philosopher: Philosopher
    quotes: Quote[]
  }
>

export class CreateQuoteListUseCase {
  constructor(
    private quoteRepository: QuoteRepository,
    private philosopherRepository: PhilosopherRepository,
  ) {}

  async execute({
    philosopher_id,
    phrases,
  }: CreateQuoteListUseCaseRequest): Promise<CreateQuoteListUseCaseResponse> {
    const philosopherAlreadyExists =
      await this.philosopherRepository.findById(philosopher_id)

    if (!philosopherAlreadyExists) {
      return left(new ResourceNotFoundError('Philosopher'))
    }

    const quotes = []

    for (const phrase of phrases) {
      const quote = await this.quoteRepository.create({
        phrase,
        philosopher_id,
      })

      delete quote.philosopher_id

      quotes.push(quote)
    }

    return right({ philosopher: philosopherAlreadyExists, quotes })
  }
}
