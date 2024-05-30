export const findPhilosopherByIdSwagger = {
  description: 'Route to find a philosopher using his ID',
  tags: ['Philosopher'],
  security: [{ Bearer: [] }],
  summary: 'Route to find a philosopher using his ID',
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Philosopher id',
      },
    },
  },
  response: {
    200: {
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
