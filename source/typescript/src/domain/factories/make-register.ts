import { BcryptHashRepository } from '../../infra/cryptography/bcrypt/bcrypt-hash-repository'
import { KnexUserRepository } from '../../infra/database/knex/knex-user-repository'

import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const userRepository = new KnexUserRepository()
  const HashRepository = new BcryptHashRepository()

  const register = new RegisterUseCase(userRepository, HashRepository)

  return register
}
