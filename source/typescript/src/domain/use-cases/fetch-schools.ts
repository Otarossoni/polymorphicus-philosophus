import { Either, right } from 'src/core/errors/either'

import { PhilosophySchool } from '../models/database/philosophy-school'

import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'

type FetchPhilosophySchoolUseCaseResponse = Either<
  null,
  { philosophySchools: PhilosophySchool[] }
>

export class FetchPhilosophySchoolUseCase {
  constructor(private philosophySchoolRepository: PhilosophySchoolRepository) {}

  async execute(): Promise<FetchPhilosophySchoolUseCaseResponse> {
    const philosophySchools = await this.philosophySchoolRepository.findByAll()

    return right({ philosophySchools })
  }
}
