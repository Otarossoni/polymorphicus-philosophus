import { FastifyRequest, FastifyReply } from 'fastify'

export async function healthCheck(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(200).send({ message: 'Health Check' })
}
