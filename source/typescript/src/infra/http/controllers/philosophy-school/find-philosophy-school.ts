import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindPhilosophySchoolUseCase } from 'src/domain/factories/make-find-school-by-id'
import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function findPhilosophySchool(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPhilosophySchoolByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findPhilosophySchoolByIdParamsSchema.parse(request.params)

  const findPhilosophySchoolUseCase = makeFindPhilosophySchoolUseCase()

  const result = await findPhilosophySchoolUseCase.execute({ id })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.send(result.value)
}
