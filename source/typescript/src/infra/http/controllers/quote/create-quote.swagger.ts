export const createQuoteSwagger = {
  description: 'Route to create a new quote',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to create a new quote',
  body: {
    type: 'object',
    properties: {
      phrase: {
        type: 'string',
        description: 'Phrase',
      },
      philosopher_id: {
        type: 'string',
        description: 'Philosopher id',
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        quote: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Philosophy school id',
            },
            phrase: {
              type: 'string',
              description: 'Phrase',
            },
            philosopher_id: {
              type: 'string',
              description: 'Philosopher id',
            },
          },
        },
      },
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
