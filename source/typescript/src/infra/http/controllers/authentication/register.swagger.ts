export const registerSwagger = {
  description: 'Route to register a new user',
  tags: ['Authentication'],
  summary: 'Route to register a new user',
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'User name',
      },
      email: {
        type: 'string',
        description: 'User e-mail',
      },
      password: {
        type: 'string',
        description: 'User password',
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'null',
    },
    409: {
      description: 'Conflict response',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
