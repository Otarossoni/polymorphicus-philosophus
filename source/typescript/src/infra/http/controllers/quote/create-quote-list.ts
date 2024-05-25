import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeCreateQuoteListUseCase } from 'src/domain/factories/make-create-quote-list'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function createQuoteList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createQuoteListBodySchema = z.object({
    philosopher_id: z.string(),
    phrases: z.array(z.string()),
  })

  const { philosopher_id, phrases } = createQuoteListBodySchema.parse(
    request.body,
  )

  const createQuoteListUseCase = makeCreateQuoteListUseCase()

  const result = await createQuoteListUseCase.execute({
    philosopher_id,
    phrases,
  })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  console.log(result.value)

  return reply.status(201).send(result.value)
}
