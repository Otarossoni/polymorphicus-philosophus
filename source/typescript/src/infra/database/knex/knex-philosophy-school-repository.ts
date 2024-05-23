import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { PhilosophySchoolRepository } from '../../../domain/repositories/database/philosophy-school-repository'

import { PhilosophySchool } from '../../../domain/models/database/philosophy-school'

const PHILOSOPHY_SCHOOL_TABLE = 'public.philosophy_school'

export class KnexPhilosophySchoolRepository
  implements PhilosophySchoolRepository
{
  async findByName(name: string): Promise<PhilosophySchool | null> {
    const [philosophySchool]: PhilosophySchool[] = await knex
      .select('*')
      .from(PHILOSOPHY_SCHOOL_TABLE)
      .where({ name })

    return philosophySchool
  }

  async create(data: PhilosophySchool): Promise<PhilosophySchool> {
    const newPhilosopherSchool: PhilosophySchool = { id: randomUUID(), ...data }

    await knex(PHILOSOPHY_SCHOOL_TABLE)
      .insert(newPhilosopherSchool)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newPhilosopherSchool
  }
}
