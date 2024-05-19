import { User } from '../models/database/user'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<void>
}
