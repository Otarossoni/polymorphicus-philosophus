import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchPhilosophySchoolUseCase } from 'src/domain/factories/make-fetch-philosophy-schools'

export async function fetchPhilosophySchools(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPhilosophySchoolUseCases = makeFetchPhilosophySchoolUseCase()

  const result = await fetchPhilosophySchoolUseCases.execute()

  return reply.send(result.value)
}
