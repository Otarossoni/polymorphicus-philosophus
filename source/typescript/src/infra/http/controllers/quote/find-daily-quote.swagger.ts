export const findDailyQuoteSwagger = {
  description: 'Route to find a daily quote',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to find a daily quote',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        dailyQuote: {
          type: 'object',
          properties: {
            quote: {
              type: 'string',
              description: 'Quote',
            },
            day: {
              type: 'string',
              description: 'Day of Quote',
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
