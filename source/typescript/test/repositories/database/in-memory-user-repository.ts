import { randomUUID } from 'crypto'

import { User } from '../../../src/domain/models/database/user'
import { UserRepository } from '../../../src/domain/repositories/database/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: User): Promise<void> {
    const user = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(user)

    return
  }
}
