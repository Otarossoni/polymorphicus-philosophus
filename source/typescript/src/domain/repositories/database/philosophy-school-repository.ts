import { PhilosophySchool } from '../../models/database/philosophy-school'

export interface PhilosophySchoolRepository {
  findByName(name: string): Promise<PhilosophySchool>
  create(data: PhilosophySchool): Promise<void>
}
