import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchQuotesUseCase } from 'src/domain/factories/make-fetch-quotes'

export async function fetchQuotes(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchQuotesUseCase = makeFetchQuotesUseCase()

  const result = await fetchQuotesUseCase.execute()

  return reply.send(result.value)
}
