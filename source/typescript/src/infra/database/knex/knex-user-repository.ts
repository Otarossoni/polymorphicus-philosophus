import { User } from '../../../domain/models/database/user'
import { UserRepository } from '../../../domain/repositories/database/user-repository'
import { knex } from '../database'

const USER_TABLE = 'public.user'

export class KnexUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    const [user]: User[] = await knex
      .select('*')
      .from(USER_TABLE)
      .where({ email })

    return user
  }

  async create(data: User): Promise<void> {
    await knex(USER_TABLE)
      .insert(data)
      .then()
      .catch((err) => {
        console.error(err)
      })

    return
  }
}
