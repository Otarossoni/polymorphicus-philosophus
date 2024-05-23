import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePhilosopherUseCase } from './create-philosopher'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryPhilosopherSchoolRepository } from 'test/repositories/database/in-memory-philosopher-school-repository'
import { InMemoryPhilosophySchoolRepository } from 'test/repositories/database/in-memory-philosophy-school-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository
let inMemoryPhilosopherSchoolRepository: InMemoryPhilosopherSchoolRepository
let inMemoryPhilosophySchoolRepository: InMemoryPhilosophySchoolRepository

let sut: CreatePhilosopherUseCase

describe('Create Philosopher', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()
    inMemoryPhilosopherSchoolRepository =
      new InMemoryPhilosopherSchoolRepository()
    inMemoryPhilosophySchoolRepository =
      new InMemoryPhilosophySchoolRepository()

    sut = new CreatePhilosopherUseCase(
      inMemoryPhilosopherRepository,
      inMemoryPhilosopherSchoolRepository,
      inMemoryPhilosophySchoolRepository,
    )
  })

  it('should be able to create a philosopher', async () => {
    const philosophySchool = await inMemoryPhilosophySchoolRepository.create({
      id: 'ID1',
      name: '',
      century: 'I',
    })

    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
      school_id: philosophySchool.id,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expect.any(Object))
    expect(inMemoryPhilosopherRepository.items.length).toEqual(1)
  })

  it('should not be able to create a philosopher with same name twice', async () => {
    const philosophySchool = await inMemoryPhilosophySchoolRepository.create({
      id: 'ID1',
      name: '',
      century: 'I',
    })

    await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
      school_id: philosophySchool.id,
    })

    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
      school_id: philosophySchool.id,
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryPhilosopherRepository.items.length).toEqual(1)
    expect(result.value).instanceOf(ResourceAlreadyExistsError)
  })

  it('should not be able to create a philosopher without schoolId', async () => {
    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
      school_id: '',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
    expect(inMemoryPhilosopherRepository.items.length).toEqual(0)
  })

  it('should not be able to create a philosopher with invalid schoolId', async () => {
    const result = await sut.execute({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
      school_id: 'school_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(ResourceNotFoundError)
    expect(inMemoryPhilosopherRepository.items.length).toEqual(0)
  })
})
