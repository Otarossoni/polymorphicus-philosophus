import { Either, left, right } from '../../core/errors/either'

import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

interface CreatePhilosophySchoolUseCaseRequest {
  name: string
  century: string
}

type CreatePhilosophySchoolUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  null
>

export class CreatePhilosophySchoolUseCase {
  constructor(private philosophySchoolRepository: PhilosophySchoolRepository) {}

  async execute({
    name,
    century,
  }: CreatePhilosophySchoolUseCaseRequest): Promise<CreatePhilosophySchoolUseCaseResponse> {
    const philosophySchoolAlreadyExists =
      await this.philosophySchoolRepository.findByName(name)

    if (philosophySchoolAlreadyExists) {
      return left(new ResourceAlreadyExistsError('Philosophy School'))
    }

    await this.philosophySchoolRepository.create({
      name,
      century,
    })

    return right(null)
  }
}
