import { describe, beforeEach, it, expect } from 'vitest'

import { AuthenticateUseCase } from './authenticate'

import { InMemoryUserRepository } from 'test/repositories/database/in-memory-user-repository'
import { FakeHashRepository } from 'test/repositories/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/repositories/cryptography/fake-encrypter'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHashRepository = new FakeHashRepository()
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHashRepository = new FakeHashRepository()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUseCase(
      inMemoryUserRepository,
      fakeHashRepository,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHashRepository.generate('123456'),
    })

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await fakeHashRepository.generate('123456'),
    })

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
