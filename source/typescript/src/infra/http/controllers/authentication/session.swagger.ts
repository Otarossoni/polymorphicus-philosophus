export const sessionSwagger = {
  description: 'Route to authorize an existing user',
  tags: ['Authentication'],
  summary: 'Route to authorize an existing user',
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
        access_token: { type: 'string', description: 'User access token' },
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
