import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createQuote } from './create-quote'
import { createQuoteSwagger } from './create-quote.swagger'

import { createQuoteList } from './create-quote-list'
import { createQuoteListSwagger } from './create-quote-list.swagger'

export async function quoteRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/quote', { schema: createQuoteSwagger }, createQuote)
  app.post('/quote/list', { schema: createQuoteListSwagger }, createQuoteList)
}
