export const fetchQuotesSwagger = {
  description: 'Route to fetch all quotes',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to fetch all quotes',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        quotes: {
          type: 'array',
          items: {
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
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
