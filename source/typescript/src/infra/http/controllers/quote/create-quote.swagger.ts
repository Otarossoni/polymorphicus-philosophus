export const createQuoteSwagger = {
  description: 'Route to create a new quote',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to create a new quote',
  body: {
    type: 'object',
    properties: {
      philosopher_id: {
        type: 'string',
        description: 'Philosopher id',
      },
      phrase: {
        type: 'string',
        description: 'Phrase',
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
              description: 'Quote id',
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
    404: {
      description: 'Not found response',
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
