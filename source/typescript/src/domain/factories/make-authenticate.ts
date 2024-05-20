import { KnexUserRepository } from '../../infra/database/knex/knex-user-repository'
import { BcryptHashRepository } from '../../infra/cryptography/bcrypt/bcrypt-hash-repository'
import { JwtEncrypterRepository } from '../../infra/cryptography/jwt/jwt-encrypt-repository'

import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new KnexUserRepository()
  const hashRepository = new BcryptHashRepository()
  const encrypterRepository = new JwtEncrypterRepository()

  const register = new AuthenticateUseCase(
    userRepository,
    hashRepository,
    encrypterRepository,
  )

  return register
}
