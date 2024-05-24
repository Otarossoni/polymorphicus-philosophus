import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createQuote } from './create-quote'
import { createQuoteSwagger } from './create-quote.swagger'

export async function quoteRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/quote', { schema: createQuoteSwagger }, createQuote)
}
