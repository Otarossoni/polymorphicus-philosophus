import { Either, left, right } from '../../core/errors/either'

import { UserRepository } from '../repositories/database/user-repository'
import { HashRepository } from '../repositories/cryptography/hash-repository'
import { EncrypterRepository } from '../repositories/cryptography/encrypt-repository'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashRepository: HashRepository,
    private encrypterRepository: EncrypterRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashRepository.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypterRepository.encrypt({
      sub: user.id,
    })

    return right({ accessToken })
  }
}
