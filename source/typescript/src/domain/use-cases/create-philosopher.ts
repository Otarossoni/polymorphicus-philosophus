import { Either, left, right } from '../../core/errors/either'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

interface CreatePhilosopherUseCaseRequest {
  name: string
  nationality: string
  born_date: string
  death_date: string
}

type CreatePhilosopherUseCaseResponse = Either<ResourceAlreadyExistsError, null>

export class CreatePhilosopherUseCase {
  constructor(private philosopherRepository: PhilosopherRepository) {}

  async execute({
    name,
    nationality,
    born_date,
    death_date,
  }: CreatePhilosopherUseCaseRequest): Promise<CreatePhilosopherUseCaseResponse> {
    const philosopherAlreadyExists =
      await this.philosopherRepository.findByName(name)

    if (philosopherAlreadyExists) {
      return left(new ResourceAlreadyExistsError('Philosopher'))
    }

    await this.philosopherRepository.create({
      name,
      nationality,
      born_date,
      death_date,
    })

    return right(null)
  }
}
