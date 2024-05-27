import { Either, right } from 'src/core/errors/either'

import { PhilosophySchool } from '../models/database/philosophy-school'

import { PhilosophySchoolRepository } from '../repositories/database/philosophy-school-repository'

type FetchPhilosophySchoolsUseCaseResponse = Either<
  null,
  { philosophySchools: PhilosophySchool[] }
>

export class FetchPhilosophySchoolsUseCase {
  constructor(private philosophySchoolRepository: PhilosophySchoolRepository) {}

  async execute(): Promise<FetchPhilosophySchoolsUseCaseResponse> {
    const philosophySchools = await this.philosophySchoolRepository.findByAll()

    return right({ philosophySchools })
  }
}
