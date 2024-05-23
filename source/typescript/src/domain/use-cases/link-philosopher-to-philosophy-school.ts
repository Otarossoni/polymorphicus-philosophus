import { Either, left, right } from 'src/core/errors/either'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'
import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'
import { PhilosopherSchoolRepository } from '../repositories/database/philosopher-school-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface LinkPhilosopherToPhilosophySchoolUseCaseRequest {
  philosopher_id: string
  school_id: string
}

type LinkPhilosopherToPhilosophySchoolUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class LinkPhilosopherToPhilosophySchoolUseCase {
  constructor(
    private philosopherRepository: PhilosopherRepository,
    private philosophySchoolRepository: PhilosophySchoolRepository,
    private philosopherSchoolRepository: PhilosopherSchoolRepository,
  ) {}

  async execute({
    philosopher_id,
    school_id,
  }: LinkPhilosopherToPhilosophySchoolUseCaseRequest): Promise<LinkPhilosopherToPhilosophySchoolUseCaseResponse> {
    const philosophySchoolAlreadyExists =
      await this.philosophySchoolRepository.findById(school_id)

    if (!philosophySchoolAlreadyExists) {
      return left(new ResourceNotFoundError('Philosophy School'))
    }

    const philosopherAlreadyExists =
      await this.philosopherRepository.findById(philosopher_id)

    if (!philosopherAlreadyExists) {
      return left(new ResourceNotFoundError('Philosopher'))
    }

    await this.philosopherSchoolRepository.create({
      philosopher_id,
      school_id,
    })

    return right(null)
  }
}
