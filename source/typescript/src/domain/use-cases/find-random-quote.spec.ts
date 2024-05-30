import { describe, beforeEach, it, expect } from 'vitest'

import { FindRandomQuoteUseCase } from './find-random-quote'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryQuoteRepository } from 'test/repositories/database/in-memory-quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository
let inMemoryQuoteRepository: InMemoryQuoteRepository

let sut: FindRandomQuoteUseCase

describe('Find Random Quote', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()
    inMemoryQuoteRepository = new InMemoryQuoteRepository()

    sut = new FindRandomQuoteUseCase(inMemoryQuoteRepository)
  })

  it('should be able to find a random quote', async () => {
    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const numberOfQuotes = 5

    for (let i = 0; i < numberOfQuotes; i++) {
      inMemoryQuoteRepository.create({
        philosopher_id: philosopher.id,
        phrase: `${i}`,
      })
    }

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
  })

  it('should not be able to find a random quote without quotes', async () => {
    const result = await sut.execute()

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
