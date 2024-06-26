import { randomUUID } from 'node:crypto'

import { Philosopher } from '../../../src/domain/models/database/philosopher'
import { PhilosopherRepository } from '../../../src/domain/repositories/database/philosopher-repository'

export class InMemoryPhilosopherRepository implements PhilosopherRepository {
  public items: Philosopher[] = []

  async findById(id: string): Promise<Philosopher> {
    const philosopher = this.items.find((item) => item.id === id)

    if (!philosopher) {
      return null
    }

    return philosopher
  }

  async findByName(name: string): Promise<Philosopher> {
    const philosopher = this.items.find((item) => item.name === name)

    if (!philosopher) {
      return null
    }

    return philosopher
  }

  async findByAll(): Promise<Philosopher[]> {
    return this.items
  }

  async create(data: Philosopher): Promise<Philosopher> {
    const newPhilosopher: Philosopher = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(newPhilosopher)

    return newPhilosopher
  }
}
