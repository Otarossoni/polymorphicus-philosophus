import { Either, left, right } from '../../core/errors/either'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'
import { PhilosopherSchoolRepository } from '../repositories/database/philosopher-school-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

interface CreatePhilosopherUseCaseRequest {
  name: string
  nationality: string
  born_date: string
  death_date: string
  school_id: string
}

type CreatePhilosopherUseCaseResponse = Either<ResourceAlreadyExistsError, null>

export class CreatePhilosopherUseCase {
  constructor(
    private philosopherRepository: PhilosopherRepository,
    private philosopherSchoolRepository: PhilosopherSchoolRepository,
  ) {}

  async execute({
    name,
    nationality,
    born_date,
    death_date,
    school_id,
  }: CreatePhilosopherUseCaseRequest): Promise<CreatePhilosopherUseCaseResponse> {
    const philosopherAlreadyExists =
      await this.philosopherRepository.findByName(name)

    if (philosopherAlreadyExists) {
      return left(new ResourceAlreadyExistsError('Philosopher'))
    }

    const { id } = await this.philosopherRepository.create({
      name,
      nationality,
      born_date,
      death_date,
    })

    await this.philosopherSchoolRepository.create({
      school_id,
      philosopher_id: id,
    })

    return right(null)
  }
}
