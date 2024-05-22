export const sessionSwagger = {
  description: 'Route to authorize a user',
  tags: ['Authentication'],
  summary: 'Route to authorize a user',
  body: {
    type: 'object',
    properties: {
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
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
    401: {
      description: 'Unauthorized',
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
