export const fetchPhilosophersSwagger = {
  description: 'Route to fetch all philosophers',
  tags: ['Philosopher'],
  security: [{ Bearer: [] }],
  summary: 'Route to fetch all philosophers',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        philosophers: {
          type: 'array',
          items: {
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
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
