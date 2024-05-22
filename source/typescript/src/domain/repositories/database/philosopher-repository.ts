import { Philosopher } from 'src/domain/models/database/philosopher'

export interface PhilosopherRepository {
  findByName(name: string): Promise<Philosopher | null>
  create(data: Philosopher): Promise<void>
}
