import { FastifyInstance } from 'fastify'

import { register } from './register'
import { session } from './session'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/session', session)
}
