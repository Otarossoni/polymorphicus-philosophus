export const findRandomQuoteSwagger = {
  description: 'Route to find a random quote',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to find a random quote',
  response: {
    200: {
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
