import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { PhilosopherRepository } from '../../../domain/repositories/database/philosopher-repository'

import { Philosopher } from '../../../domain/models/database/philosopher'

const PHILOSOPHER_TABLE = 'public.philosopher'

export class KnexPhilosopherRepository implements PhilosopherRepository {
  async findByName(name: string): Promise<Philosopher | null> {
    const [philosopher]: Philosopher[] = await knex
      .select('*')
      .from(PHILOSOPHER_TABLE)
      .where({ name })

    return philosopher
  }

  async create(data: Philosopher): Promise<Philosopher> {
    const newPhilosopher: Philosopher = { id: randomUUID(), ...data }

    await knex(PHILOSOPHER_TABLE)
      .insert(newPhilosopher)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newPhilosopher
  }
}
