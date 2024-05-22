import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makePhilosopherUseCase } from '../../../../domain/factories/make-create-philosopher'

import { ResourceAlreadyExistsError } from '../../../../domain/use-cases/errors/resource-already-exists-error'

import { validateBcAcDate } from 'src/domain/utils/validate-bc-ac-date'

export async function createPhilosopher(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPhilosopherBodySchema = z.object({
    name: z.string(),
    nationality: z.string(),
    born_date: z.string(),
    death_date: z.string(),
  })

  const { name, nationality, born_date, death_date } =
    createPhilosopherBodySchema.parse(request.body)

  const isBornDateValid = validateBcAcDate(born_date)

  const isDeathDateValid = validateBcAcDate(death_date)

  if (!isBornDateValid) {
    return reply.status(400).send({ message: 'Born date is invalid.' })
  }

  if (!isDeathDateValid) {
    return reply.status(400).send({ message: 'Death date is invalid.' })
  }

  const createPhilosopherUseCase = makePhilosopherUseCase()

  const result = await createPhilosopherUseCase.execute({
    name,
    nationality,
    born_date,
    death_date,
  })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
