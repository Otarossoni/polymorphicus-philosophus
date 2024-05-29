import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { fetchQuotes } from './fetch-quotes'
import { fetchQuotesSwagger } from './fetch-quotes.swagger'

import { findRandomQuote } from './find-random-quote'
import { findRandomQuoteSwagger } from './find-random-quote.swagger'

import { findDailyQuote } from './find-daily-quote'
import { findDailyQuoteSwagger } from './find-daily-quote.swagger'

import { createQuote } from './create-quote'
import { createQuoteSwagger } from './create-quote.swagger'

import { createQuoteList } from './create-quote-list'
import { createQuoteListSwagger } from './create-quote-list.swagger'

export async function quoteRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/quote', { schema: fetchQuotesSwagger }, fetchQuotes)
  app.get('/quote/random', { schema: findRandomQuoteSwagger }, findRandomQuote)
  app.get('/quote/daily', { schema: findDailyQuoteSwagger }, findDailyQuote)

  app.post('/quote', { schema: createQuoteSwagger }, createQuote)
  app.post('/quote/list', { schema: createQuoteListSwagger }, createQuoteList)
}
