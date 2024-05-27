import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchPhilosophersUseCase } from 'src/domain/factories/make-fetch-philosophers'

export async function fetchPhilosophers(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPhilosophersUseCase = makeFetchPhilosophersUseCase()

  const result = await fetchPhilosophersUseCase.execute()

  return reply.send(result.value)
}
