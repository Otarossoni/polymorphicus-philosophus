import { BcryptHashRepository } from '../../infra/cryptography/bcrypt/bcrypt-hash-repository'
import { KnexUserRepository } from '../../infra/database/knex/knex-user-repository'

import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const userRepository = new KnexUserRepository()
  const hashRepository = new BcryptHashRepository()

  const register = new RegisterUseCase(userRepository, hashRepository)

  return register
}
