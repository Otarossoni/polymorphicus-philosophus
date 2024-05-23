import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeLinkPhilosopherToPhilosophySchoolUseCase } from 'src/domain/factories/make-link-philosopher-to-philosophy-school'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function linkPhilosopherToPhilosophySchool(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const linkPhilosopherToPhilosophySchoolBodySchema = z.object({
    philosopher_id: z.string(),
    school_id: z.string(),
  })

  const { philosopher_id, school_id } =
    linkPhilosopherToPhilosophySchoolBodySchema.parse(request.body)

  const linkPhilosopherToPhilosophySchoolUseCase =
    makeLinkPhilosopherToPhilosophySchoolUseCase()

  const result = await linkPhilosopherToPhilosophySchoolUseCase.execute({
    philosopher_id,
    school_id,
  })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
