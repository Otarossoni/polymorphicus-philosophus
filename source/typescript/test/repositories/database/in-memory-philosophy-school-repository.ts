import { randomUUID } from 'node:crypto'

import { PhilosophySchool } from '../../../src/domain/models/database/philosophy-school'
import { PhilosophySchoolRepository } from '../../../src/domain/repositories/database/philosophy-school-repository'

export class InMemoryPhilosophySchoolRepository
  implements PhilosophySchoolRepository
{
  public items: PhilosophySchool[] = []

  async findByName(name: string): Promise<PhilosophySchool> {
    const philosophySchool = this.items.find((item) => item.name === name)

    if (!philosophySchool) {
      return null
    }

    return philosophySchool
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
