export const createPhilosopherSwagger = {
  description: 'Route to create a new philosopher',
  tags: ['Philosopher'],
  security: [{ Bearer: [] }],
  summary: 'Route to create a new philosopher',
  body: {
    type: 'object',
    properties: {
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
      school_id: {
        type: 'string',
        description: 'Philosophy school linked',
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
            school_id: {
              type: 'string',
              description: 'Philosophy school linked',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string' },
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
