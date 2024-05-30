import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindPhilosopherByIdUseCase } from 'src/domain/factories/make-find-philosopher-by-id'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function findPhilosopherById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPhilosopherByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findPhilosopherByIdParamsSchema.parse(request.params)

  const findPhilosopherByIdUseCase = makeFindPhilosopherByIdUseCase()

  const result = await findPhilosopherByIdUseCase.execute({ id })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.status(200).send(result.value)
}
