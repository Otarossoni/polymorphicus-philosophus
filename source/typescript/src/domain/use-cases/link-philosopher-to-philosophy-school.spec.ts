import { describe, beforeEach, it, expect } from 'vitest'

import { LinkPhilosopherToPhilosophySchoolUseCase } from './link-philosopher-to-philosophy-school'

import { InMemoryPhilosopherRepository } from 'test/repositories/database/in-memory-philosopher-repository'
import { InMemoryPhilosopherSchoolRepository } from 'test/repositories/database/in-memory-philosopher-school-repository'
import { InMemoryPhilosophySchoolRepository } from 'test/repositories/database/in-memory-philosophy-school-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryPhilosopherRepository: InMemoryPhilosopherRepository
let inMemoryPhilosopherSchoolRepository: InMemoryPhilosopherSchoolRepository
let inMemoryPhilosophySchoolRepository: InMemoryPhilosophySchoolRepository

let sut: LinkPhilosopherToPhilosophySchoolUseCase

describe('Link philosopher to philosophy school', () => {
  beforeEach(() => {
    inMemoryPhilosopherRepository = new InMemoryPhilosopherRepository()
    inMemoryPhilosopherSchoolRepository =
      new InMemoryPhilosopherSchoolRepository()
    inMemoryPhilosophySchoolRepository =
      new InMemoryPhilosophySchoolRepository()

    sut = new LinkPhilosopherToPhilosophySchoolUseCase(
      inMemoryPhilosopherRepository,
      inMemoryPhilosophySchoolRepository,
      inMemoryPhilosopherSchoolRepository,
    )
  })

  it('should be able to link a philosopher to philosophy school', async () => {
    const philosophySchool = await inMemoryPhilosophySchoolRepository.create({
      id: 'ID1',
      name: '',
      century: 'I',
    })

    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    await inMemoryPhilosopherSchoolRepository.create({
      philosopher_id: philosopher.id,
      school_id: philosophySchool.id,
    })

    const newPhilosophySchool = await inMemoryPhilosophySchoolRepository.create(
      {
        id: 'ID2',
        name: '',
        century: 'I',
      },
    )

    const result = await sut.execute({
      philosopher_id: philosopher.id,
      school_id: newPhilosophySchool.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryPhilosopherSchoolRepository.items).toHaveLength(2)
  })

  it('should be not able to link a philosopher to philosophy school with non existing philosopher', async () => {
    const philosophySchool = await inMemoryPhilosophySchoolRepository.create({
      id: 'ID1',
      name: '',
      century: 'I',
    })

    const result = await sut.execute({
      philosopher_id: '123',
      school_id: philosophySchool.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(ResourceNotFoundError)
    expect(inMemoryPhilosopherSchoolRepository.items).toHaveLength(0)
  })

  it('should be not able to link a philosopher to philosophy school with non existing philosophy school', async () => {
    const philosopher = await inMemoryPhilosopherRepository.create({
      name: 'Philosopher',
      nationality: 'Philosopher Nationality',
      born_date: '9999-01-01T00:00:00Z A.C.',
      death_date: '9999-01-01T00:00:00Z B.C.',
    })

    const result = await sut.execute({
      philosopher_id: philosopher.id,
      school_id: '123',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(ResourceNotFoundError)
    expect(inMemoryPhilosopherSchoolRepository.items).toHaveLength(0)
  })
})
