import { Either, left, right } from 'src/core/errors/either'

import { Quote } from '../models/database/quote'

import { QuoteRepository } from '../repositories/database/quote-repository'
import { PhilosopherRepository } from '../repositories/database/philosopher-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateQuoteUseCaseRequest {
  phrase: string
  philosopher_id: string
}

type CreateQuoteUseCaseResponse = Either<
  ResourceNotFoundError,
  { quote: Quote }
>

export class CreateQuoteUseCase {
  constructor(
    private quoteRepository: QuoteRepository,
    private philosopherRepository: PhilosopherRepository,
  ) {}

  async execute({
    phrase,
    philosopher_id,
  }: CreateQuoteUseCaseRequest): Promise<CreateQuoteUseCaseResponse> {
    const philosopherAlreadyExists =
      await this.philosopherRepository.findById(philosopher_id)

    if (!philosopherAlreadyExists) {
      return left(new ResourceNotFoundError('Philosopher'))
    }

    const quote = await this.quoteRepository.create({
      phrase,
      philosopher_id,
    })

    return right({ quote })
  }
}
