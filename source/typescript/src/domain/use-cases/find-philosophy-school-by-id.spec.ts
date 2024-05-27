import { describe, beforeEach, it, expect } from 'vitest'

import { FindPhilosophySchoolByIdUseCase } from './find-philosophy-school-by-id'

import { InMemoryPhilosophySchoolRepository } from 'test/repositories/database/in-memory-philosophy-school-repository'

let inMemoryPhilosophySchoolRepository: InMemoryPhilosophySchoolRepository

let sut: FindPhilosophySchoolByIdUseCase

describe('Find Philosophy School By Id', () => {
  beforeEach(() => {
    inMemoryPhilosophySchoolRepository =
      new InMemoryPhilosophySchoolRepository()

    sut = new FindPhilosophySchoolByIdUseCase(
      inMemoryPhilosophySchoolRepository,
    )
  })

  it('should be able to find philosophy school by id', async () => {
    const philosophySchool = await inMemoryPhilosophySchoolRepository.create({
      name: `School I`,
      century: `Century I`,
    })

    const result = await sut.execute({ id: philosophySchool.id })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPhilosophySchoolRepository.items.length).toEqual(1)
  })

  it('should not be able to find philosophy school by id with non existing school', async () => {
    const result = await sut.execute({ id: '123' })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryPhilosophySchoolRepository.items.length).toEqual(0)
  })
})
