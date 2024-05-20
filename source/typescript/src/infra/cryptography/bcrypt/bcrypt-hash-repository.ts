import { HashRepository } from '../../../domain/repositories/cryptography/hash-repository'
import { hash, compare } from 'bcryptjs'

export class BcryptHashRepository implements HashRepository {
  private HASH_SALT_LENGTH = 8

  async generate(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH)
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }
}
