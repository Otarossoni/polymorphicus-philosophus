import { FastifyInstance } from 'fastify'

import { register } from './register'
import { registerSwagger } from './register.swagger'

import { session } from './session'
import { sessionSwagger } from './session.swagger'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', { schema: registerSwagger }, register)
  app.post('/session', { schema: sessionSwagger }, session)
}
