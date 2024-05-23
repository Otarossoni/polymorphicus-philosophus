export const createPhilosophySchoolSwagger = {
  description: 'Route to create a new philosophy school',
  tags: ['PhilosophySchool'],
  security: [{ Bearer: [] }],
  summary: 'Route to create a new philosophy school',
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Philosophy school name',
      },
      century: {
        type: 'string',
        description: 'Philosophy school century',
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        philosophy_school: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Philosophy school id',
            },
            name: {
              type: 'string',
              description: 'Philosophy school name',
            },
            century: {
              type: 'string',
              description: 'Philosophy school century',
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
