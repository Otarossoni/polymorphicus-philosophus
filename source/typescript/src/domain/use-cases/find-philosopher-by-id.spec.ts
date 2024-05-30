import { describe, beforeEach, it, expect } from 'vitest'

import { FindPhilosopherByIdUseCase } from './find-philosopher-by-id'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository
let sut: FindPhilosopherByIdUseCase

describe('Find Philosopher By Id', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()

    sut = new FindPhilosopherByIdUseCase(inMemoryPhilosopherRepository)
  })

  it('should be able to find philosopher by id', async () => {
    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const result = await sut.execute({ id: philosopher.id })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPhilosopherRepository.items).toHaveLength(1)
  })

  it('should not be able to find philosopher by id with non existing philosopher', async () => {
    const result = await sut.execute({ id: '123' })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryPhilosopherRepository.items).toHaveLength(0)
  })
})
