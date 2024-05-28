import { Either, left, right } from 'src/core/errors/either'

import { Philosopher } from '../models/database/philosopher'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPhilosopherByIdUseCaseRequest {
  id: string
}

type FindPhilosopherByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { philosopher: Philosopher }
>

export class FindPhilosopherByIdUseCase {
  constructor(private philosopherRepository: PhilosopherRepository) {}

  async execute({
    id,
  }: FindPhilosopherByIdUseCaseRequest): Promise<FindPhilosopherByIdUseCaseResponse> {
    const philosopher = await this.philosopherRepository.findById(id)

    if (!philosopher) {
      return left(new ResourceNotFoundError('Philosopher'))
    }

    return right({ philosopher })
  }
}
