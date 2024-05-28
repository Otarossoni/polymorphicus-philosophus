import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindRandomQuoteUseCase } from 'src/domain/factories/make-find-random-quote'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function findRandomQuote(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const findRandomQuoteUseCase = makeFindRandomQuoteUseCase()

  const result = await findRandomQuoteUseCase.execute()

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.send(result.value)
}
