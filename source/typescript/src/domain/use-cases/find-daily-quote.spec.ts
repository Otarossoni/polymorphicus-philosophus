import { describe, beforeEach, it, expect } from 'vitest'

import { FindDailyQuoteUseCase } from './find-daily-quote'

import { InMemoryDailyQuoteRepository } from 'test/repositories/database/in-memory-daily-quote-repository'
import { generateRandomDate } from 'test/utils/generate-random-date'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryDailyQuoteRepository: InMemoryDailyQuoteRepository

let sut: FindDailyQuoteUseCase

describe('Find Daily Quote', () => {
  beforeEach(() => {
    inMemoryDailyQuoteRepository = new InMemoryDailyQuoteRepository()

    sut = new FindDailyQuoteUseCase(inMemoryDailyQuoteRepository)
  })

  it('should be able to find a daily quote', async () => {
    const numberOfDailyQuotes = 5

    for (let i = 0; i < numberOfDailyQuotes; i++) {
      inMemoryDailyQuoteRepository.items.push({
        quote: `${i}`,
        day: generateRandomDate(),
      })
    }

    inMemoryDailyQuoteRepository.items.push({
      quote: '5',
      day: new Date(2024, 4, 1),
    })

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.dailyQuote.quote).toEqual('5')
    }
    expect(inMemoryDailyQuoteRepository.items).toHaveLength(
      numberOfDailyQuotes + 1,
    )
  })

  it('should not be able to find a daily quote without quotes', async () => {
    const result = await sut.execute()

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryDailyQuoteRepository.items).toHaveLength(0)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
