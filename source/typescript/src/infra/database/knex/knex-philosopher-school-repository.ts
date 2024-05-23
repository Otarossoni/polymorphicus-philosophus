import { randomUUID } from 'node:crypto'

import { knex } from '../database'

import { PhilosopherSchoolRepository } from 'src/domain/repositories/database/philosopher-school-repository'

import { PhilosopherSchool } from 'src/domain/models/database/philosopher-school'

const PHILOSOPHER_SCHOOL_TABLE = 'public.philosopher_school'

export class KnexPhilosopherSchoolRepository
  implements PhilosopherSchoolRepository
{
  async create(data: PhilosopherSchool): Promise<PhilosopherSchool> {
    const newPhilosopherSchool: PhilosopherSchool = {
      id: randomUUID(),
      ...data,
    }

    await knex(PHILOSOPHER_SCHOOL_TABLE)
      .insert(newPhilosopherSchool)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newPhilosopherSchool
  }
}
