export const linkPhilosopherToPhilosophySchoolSwagger = {
  description: 'Route to link a philosopher to philosophy school',
  tags: ['Philosopher'],
  security: [{ Bearer: [] }],
  summary: 'Route to link a philosopher to philosophy school',
  body: {
    type: 'object',
    properties: {
      philosopher_id: {
        type: 'string',
        description: 'Philosopher id to link',
      },
      school_id: {
        type: 'string',
        description: 'Philosophy school id to link',
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'null',
    },
    404: {
      description: 'Not found',
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
