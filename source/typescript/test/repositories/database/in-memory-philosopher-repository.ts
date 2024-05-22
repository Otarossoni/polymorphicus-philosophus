import { randomUUID } from 'node:crypto'

import { Philosopher } from '../../../src/domain/models/database/philosopher'
import { PhilosopherRepository } from '../../../src/domain/repositories/database/philosopher-repository'

export class InMemoryPhilosopherRepository implements PhilosopherRepository {
  public items: Philosopher[] = []

  async findByName(name: string): Promise<Philosopher> {
    const philosopher = this.items.find((item) => item.name === name)

    if (!philosopher) {
      return null
    }

    return philosopher
  }

  async create(data: Philosopher): Promise<void> {
    const philosopher = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(philosopher)

    return
  }
}
