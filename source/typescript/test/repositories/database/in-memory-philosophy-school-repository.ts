import { randomUUID } from 'node:crypto'

import { PhilosophySchool } from '../../../src/domain/models/database/philosophy-school'
import { PhilosophySchoolRepository } from '../../../src/domain/repositories/database/philosophy-school-repository'

export class InMemoryPhilosophySchoolRepository
  implements PhilosophySchoolRepository
{
  public items: PhilosophySchool[] = []

  async findById(id: string): Promise<PhilosophySchool | null> {
    const philosophySchool = this.items.find((item) => item.id === id)

    if (!philosophySchool) {
      return null
    }

    return philosophySchool
  }

  async findByName(name: string): Promise<PhilosophySchool | null> {
    const philosophySchool = this.items.find((item) => item.name === name)

    if (!philosophySchool) {
      return null
    }

    return philosophySchool
  }

  async findByAll(): Promise<PhilosophySchool[]> {
    return this.items
  }

  async create(data: PhilosophySchool): Promise<PhilosophySchool> {
    const newPhilosophySchool = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(newPhilosophySchool)

    return newPhilosophySchool
  }
}
