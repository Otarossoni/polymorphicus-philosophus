import { describe, beforeEach, it, expect } from 'vitest'

import { CreateQuoteUseCase } from './create-quote'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryQuoteRepository } from 'test/repositories/database/in-memory-quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuoteRepository: InMemoryQuoteRepository
let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository

let sut: CreateQuoteUseCase

describe('Link philosopher to philosophy school', () => {
  beforeEach(() => {
    inMemoryQuoteRepository = new InMemoryQuoteRepository()
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()

    sut = new CreateQuoteUseCase(
      inMemoryQuoteRepository,
      inMemoryPhilosopherRepository,
    )
  })

  it('should be able to create a new quote', async () => {
    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const result = await sut.execute({
      phrase: 'I think, therefore I Am',
      philosopher_id: philosopher.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuoteRepository.items).toHaveLength(1)
  })

  it('should not be able to create a new quote with non existing philosopher', async () => {
    const result = await sut.execute({
      phrase: 'I think, therefore I Am',
      philosopher_id: '123',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryQuoteRepository.items).toHaveLength(0)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
