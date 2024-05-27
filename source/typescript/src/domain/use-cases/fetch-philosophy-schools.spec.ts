import { describe, beforeEach, it, expect } from 'vitest'

import { FetchPhilosophySchoolsUseCase } from './fetch-schools'

import { InMemoryPhilosophySchoolRepository } from 'test/repositories/database/in-memory-philosophy-school-repository'

let inMemoryPhilosophySchoolRepository: InMemoryPhilosophySchoolRepository

let sut: FetchPhilosophySchoolsUseCase

describe('Fetch Philosophy Schools', () => {
  beforeEach(() => {
    inMemoryPhilosophySchoolRepository =
      new InMemoryPhilosophySchoolRepository()

    sut = new FetchPhilosophySchoolsUseCase(inMemoryPhilosophySchoolRepository)
  })

  it('should be able to fetch all philosophy schools', async () => {
    const numberOfSchools = 5

    for (let i = 0; i < numberOfSchools; i++) {
      inMemoryPhilosophySchoolRepository.create({
        name: `School ${i + 1}`,
        century: `Century ${i + 1}`,
      })
    }

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.philosophySchools).toEqual(expect.any(Array))
    expect(inMemoryPhilosophySchoolRepository.items.length).toEqual(
      numberOfSchools,
    )
  })
})
