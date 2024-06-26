export const createQuoteListSwagger = {
  description: 'Route to create new quotes using a list',
  tags: ['Quote'],
  security: [{ Bearer: [] }],
  summary: 'Route to create new quotes using a list',
  body: {
    type: 'object',
    properties: {
      philosopher_id: {
        type: 'string',
        description: 'Philosopher id',
      },
      phrases: {
        type: 'array',
        description: 'Phrases of philosopher',
        items: {
          type: 'string',
        },
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        philosopher: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Philosopher id',
            },
            name: {
              type: 'string',
              description: 'Philosopher name',
            },
            nationality: {
              type: 'string',
              description: 'Philosopher nationality',
            },
            born_date: {
              type: 'string',
              description: 'Philosopher born date',
            },
            death_date: {
              type: 'string',
              description: 'Philosopher death date',
            },
          },
        },
        quotes: {
          type: 'array',
          description: 'Phrases of philosopher',
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
