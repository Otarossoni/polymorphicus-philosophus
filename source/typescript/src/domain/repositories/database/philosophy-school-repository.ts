import { PhilosophySchool } from '../../models/database/philosophy-school'

export interface PhilosophySchoolRepository {
  findById(id: string): Promise<PhilosophySchool | null>
  findByName(name: string): Promise<PhilosophySchool | null>
  findByAll(): Promise<PhilosophySchool[]>
  create(data: PhilosophySchool): Promise<PhilosophySchool>
}
