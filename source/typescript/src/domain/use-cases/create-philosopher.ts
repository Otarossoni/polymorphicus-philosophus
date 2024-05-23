import { Either, left, right } from '../../core/errors/either'

import { Philosopher } from '../models/database/philosopher'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'
import { PhilosopherSchoolRepository } from '../repositories/database/philosopher-school-repository'
import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePhilosopherUseCaseRequest {
  name: string
  nationality: string
  born_date: string
  death_date: string
  school_id: string
}

type CreatePhilosopherUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  { philosopher: Philosopher }
>

export class CreatePhilosopherUseCase {
  constructor(
    private philosopherRepository: PhilosopherRepository,
    private philosopherSchoolRepository: PhilosopherSchoolRepository,
    private philosophySchoolRepository: PhilosophySchoolRepository,
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

    const philosophySchoolExistes =
      await this.philosophySchoolRepository.findById(school_id)

    if (!philosophySchoolExistes) {
      return left(new ResourceNotFoundError('Philosophy School'))
    }

    const philosopher = await this.philosopherRepository.create({
      name,
      nationality,
      born_date,
      death_date,
    })

    await this.philosopherSchoolRepository.create({
      school_id,
      philosopher_id: philosopher.id,
    })

    return right({ philosopher })
  }
}
