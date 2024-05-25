import { describe, beforeEach, it, expect } from 'vitest'

import { CreateQuoteListUseCase } from './create-quote-list'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryQuoteRepository } from 'test/repositories/database/in-memory-quote-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuoteRepository: InMemoryQuoteRepository
let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository

let sut: CreateQuoteListUseCase

describe('Create quote list', () => {
  beforeEach(() => {
    inMemoryQuoteRepository = new InMemoryQuoteRepository()
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()

    sut = new CreateQuoteListUseCase(
      inMemoryQuoteRepository,
      inMemoryPhilosopherRepository,
    )
  })

  it('should be able to create a new quote using a list', async () => {
    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const result = await sut.execute({
      philosopher_id: philosopher.id,
      phrases: [
        'I think, therefore I Am',
        'The greatest minds are capable of the greatest vices as well as of the greatest virtues.',
      ],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuoteRepository.items).toHaveLength(2)
  })

  it('should not be able to create a new quote using a list with non existing philosopher', async () => {
    const result = await sut.execute({
      philosopher_id: '123',
      phrases: [
        'I think, therefore I Am',
        'The greatest minds are capable of the greatest vices as well as of the greatest virtues.',
      ],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryQuoteRepository.items).toHaveLength(0)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
