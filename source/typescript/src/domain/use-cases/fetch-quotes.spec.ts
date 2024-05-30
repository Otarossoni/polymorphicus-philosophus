import { describe, beforeEach, it, expect } from 'vitest'

import { FetchQuotesUseCase } from './fetch-quotes'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryQuoteRepository } from 'test/repositories/database/in-memory-quote-repository'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository
let inMemoryQuoteRepository: InMemoryQuoteRepository

let sut: FetchQuotesUseCase

describe('Fetch Quotes', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()
    inMemoryQuoteRepository = new InMemoryQuoteRepository()

    sut = new FetchQuotesUseCase(inMemoryQuoteRepository)
  })

  it('should be able to fetch all quotes', async () => {
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
        phrase: `I think, therefore I Am ${i}`,
      })
    }

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.quotes).toEqual(expect.any(Array))
    expect(inMemoryQuoteRepository.items).toHaveLength(numberOfQuotes)
  })
})
