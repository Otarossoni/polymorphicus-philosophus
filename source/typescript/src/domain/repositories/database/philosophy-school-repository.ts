import { PhilosophySchool } from '../../models/database/philosophy-school'

export interface PhilosophySchoolRepository {
  findByName(name: string): Promise<PhilosophySchool | null>
  create(data: PhilosophySchool): Promise<PhilosophySchool>
}
