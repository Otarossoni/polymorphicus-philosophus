import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makePhilosophySchoolUseCase } from '../../../../domain/factories/make-create-philosophy-school'

import { ResourceAlreadyExistsError } from '../../../../domain/use-cases/errors/resource-already-exists-error'

export async function createPhilosophySchool(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPhilosophySchoolBodySchema = z.object({
    name: z.string(),
    century: z.string(),
  })

  const { name, century } = createPhilosophySchoolBodySchema.parse(request.body)

  const createPhilosophySchoolUseCase = makePhilosophySchoolUseCase()

  const result = await createPhilosophySchoolUseCase.execute({ name, century })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send(result.value)
}
