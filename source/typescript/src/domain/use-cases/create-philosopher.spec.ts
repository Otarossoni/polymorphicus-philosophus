import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePhilosopherUseCase } from './create-philosopher'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository

let sut: CreatePhilosopherUseCase

describe('Create Philosopher', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()

    sut = new CreatePhilosopherUseCase(inMemoryPhilosopherRepository)
  })

  it('should be able to create a philosopher', async () => {
    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(null)
    expect(inMemoryPhilosopherRepository.items.length).toEqual(1)
  })

  it('should not be able to create a philosopher with same name twice', async () => {
    await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryPhilosopherRepository.items.length).toEqual(1)
    expect(result.value).instanceOf(ResourceAlreadyExistsError)
  })
})
