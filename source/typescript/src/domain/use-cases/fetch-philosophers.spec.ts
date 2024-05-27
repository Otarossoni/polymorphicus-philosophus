import { describe, beforeEach, it, expect } from 'vitest'

import { FetchPhilosophersUseCase } from './fetch-philosophers'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository

let sut: FetchPhilosophersUseCase

describe('Fetch Philosophers', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()

    sut = new FetchPhilosophersUseCase(inMemoryPhilosopherRepository)
  })

  it('should be able to fetch all philosophers', async () => {
    const numberOfSchools = 5

    for (let i = 0; i < numberOfSchools; i++) {
      inMemoryPhilosopherRepository.create({
        name: `Philosopher ${i + 1}`,
        nationality: 'Brazilian',
        born_date: '1596-03-31T00:00:00Z B.C.',
        death_date: '1650-02-11T00:00:00Z B.C.',
      })
    }

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.philosophers).toEqual(expect.any(Array))
    expect(inMemoryPhilosopherRepository.items.length).toEqual(numberOfSchools)
  })
})
