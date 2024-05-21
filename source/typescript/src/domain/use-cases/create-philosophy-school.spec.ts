import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePhilosophySchoolUseCase } from './create-philosophy-school'

import { InMemoryPhilosophySchoolRepository } from 'test/repositories/database/in-memory-philosophy-school-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryPhilosophySchoolRepository: InMemoryPhilosophySchoolRepository

let sut: CreatePhilosophySchoolUseCase

describe('Create Philosophy School', () => {
  beforeEach(() => {
    inMemoryPhilosophySchoolRepository =
      new InMemoryPhilosophySchoolRepository()

    sut = new CreatePhilosophySchoolUseCase(inMemoryPhilosophySchoolRepository)
  })

  it('should be able to create a philosophy school', async () => {
    const result = await sut.execute({
      name: 'School Test',
      century: 'I',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(null)
    expect(inMemoryPhilosophySchoolRepository.items.length).toEqual(1)
  })

  it('should not be able to create a philosophy school with same name twice', async () => {
    await sut.execute({
      name: 'School Test',
      century: 'I',
    })

    const result = await sut.execute({
      name: 'School Test',
      century: 'I',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryPhilosophySchoolRepository.items.length).toEqual(1)
    expect(result.value).instanceOf(ResourceAlreadyExistsError)
  })
})
