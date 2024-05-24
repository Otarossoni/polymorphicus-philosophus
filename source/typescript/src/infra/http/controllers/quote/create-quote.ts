import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeCreateQuoteUseCase } from 'src/domain/factories/make-create-quote'

import { ResourceAlreadyExistsError } from '../../../../domain/use-cases/errors/resource-already-exists-error'

export async function createQuote(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createQuoteBodySchema = z.object({
    phrase: z.string(),
    philosopher_id: z.string(),
  })

  const { phrase, philosopher_id } = createQuoteBodySchema.parse(request.body)

  const createQuoteUseCase = makeCreateQuoteUseCase()

  const result = await createQuoteUseCase.execute({ phrase, philosopher_id })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send(result.value)
}
