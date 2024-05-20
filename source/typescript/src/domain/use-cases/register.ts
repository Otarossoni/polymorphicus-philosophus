import { randomUUID } from 'node:crypto'

import { Either, left, right } from '../../core/errors/either'

import { UserRepository } from '../repositories/database/user-repository'
import { HashRepository } from '../repositories/cryptography/hash-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<ResourceAlreadyExistsError, null>

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashRepository: HashRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new ResourceAlreadyExistsError('E-mail'))
    }

    const hashedPassword = await this.hashRepository.generate(password)

    await this.userRepository.create({
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
    })

    return right(null)
  }
}
