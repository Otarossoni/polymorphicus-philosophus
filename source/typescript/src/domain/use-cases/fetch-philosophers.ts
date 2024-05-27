import { Either, right } from 'src/core/errors/either'

import { Philosopher } from '../models/database/philosopher'

import { PhilosopherRepository } from '../repositories/database/philosopher-repository'

type FetchPhilosophersUseCaseResponse = Either<
  null,
  { philosophers: Philosopher[] }
>

export class FetchPhilosophersUseCase {
  constructor(private philosopherRepository: PhilosopherRepository) {}

  async execute(): Promise<FetchPhilosophersUseCaseResponse> {
    const philosophers = await this.philosopherRepository.findByAll()

    return right({ philosophers })
  }
}
