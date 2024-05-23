import { PhilosophySchool } from '../../models/database/philosophy-school'

export interface PhilosophySchoolRepository {
  findById(id: string): Promise<PhilosophySchool | null>
  findByName(name: string): Promise<PhilosophySchool | null>
  create(data: PhilosophySchool): Promise<PhilosophySchool>
}
