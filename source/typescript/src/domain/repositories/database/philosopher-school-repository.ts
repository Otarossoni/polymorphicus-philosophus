import { PhilosopherSchool } from 'src/domain/models/database/philosopher-school'

export interface PhilosopherSchoolRepository {
  create(data: PhilosopherSchool): Promise<PhilosopherSchool>
}
