import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeRegisterUseCase } from '../../../../domain/factories/make-register'

import { ResourceAlreadyExistsError } from '../../../../domain/use-cases/errors/resource-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()
  const result = await registerUseCase.execute({ name, email, password })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
