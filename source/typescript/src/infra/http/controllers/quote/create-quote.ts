import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeCreateQuoteUseCase } from 'src/domain/factories/make-create-quote'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function createQuote(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createQuoteBodySchema = z.object({
    philosopher_id: z.string(),
    phrase: z.string(),
  })

  const { philosopher_id, phrase } = createQuoteBodySchema.parse(request.body)

  const createQuoteUseCase = makeCreateQuoteUseCase()

  const result = await createQuoteUseCase.execute({ philosopher_id, phrase })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.status(201).send(result.value)
}
