import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { UserRepository } from '../../../domain/repositories/database/user-repository'

import { User } from '../../../domain/models/database/user'

const USER_TABLE = 'public.user'

export class KnexUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    const [user]: User[] = await knex
      .select('*')
      .from(USER_TABLE)
      .where({ email })

    return user
  }

  async create(data: User): Promise<User> {
    const newUser: User = { id: randomUUID(), ...data }

    await knex(USER_TABLE)
      .insert(newUser)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return newUser
  }
}
