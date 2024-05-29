import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFindDailyQuoteUseCase } from 'src/domain/factories/make-find-daily-quote'

import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function findDailyQuote(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const findDailyQuoteUseCase = makeFindDailyQuoteUseCase()

  const result = await findDailyQuoteUseCase.execute()

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.send(result.value)
}
