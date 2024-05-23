import { Philosopher } from 'src/domain/models/database/philosopher'

export interface PhilosopherRepository {
  findById(id: string): Promise<Philosopher | null>
  findByName(name: string): Promise<Philosopher | null>
  create(data: Philosopher): Promise<Philosopher>
}
