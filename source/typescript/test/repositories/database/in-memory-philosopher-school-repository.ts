import { randomUUID } from 'node:crypto'

import { PhilosopherSchool } from 'src/domain/models/database/philosopher-school'
import { PhilosopherSchoolRepository } from 'src/domain/repositories/database/philosopher-school-repository'

export class InMemoryPhilosopherSchoolRepository
  implements PhilosopherSchoolRepository
{
  public items: PhilosopherSchool[] = []

  async create(data: PhilosopherSchool): Promise<PhilosopherSchool> {
    const newPhilosopherSchool: PhilosopherSchool = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(newPhilosopherSchool)

    return newPhilosopherSchool
  }
}
