import { Either, left, right } from 'src/core/errors/either'

import { PhilosophySchool } from '../models/database/philosophy-school'

import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPhilosophySchoolByIdUseCaseRequest {
  id: string
}

type FindPhilosophySchoolByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { philosophySchool: PhilosophySchool }
>

export class FindPhilosophySchoolByIdUseCase {
  constructor(private philosophySchoolRepository: PhilosophySchoolRepository) {}

  async execute({
    id,
  }: FindPhilosophySchoolByIdUseCaseRequest): Promise<FindPhilosophySchoolByIdUseCaseResponse> {
    const philosophySchool = await this.philosophySchoolRepository.findById(id)

    if (!philosophySchool) {
      return left(new ResourceNotFoundError('Philosophy School'))
    }

    return right({ philosophySchool })
  }
}
