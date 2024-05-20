import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeAuthenticateUseCase } from '../../../../domain/factories/make-authenticate'

import { WrongCredentialsError } from '../../../../domain/use-cases/errors/wrong-credentials-error'

export async function session(request: FastifyRequest, reply: FastifyReply) {
  const sessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = sessionBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()
  const result = await authenticateUseCase.execute({ email, password })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof WrongCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
  }

  return reply.status(200).send(result.value)
}
