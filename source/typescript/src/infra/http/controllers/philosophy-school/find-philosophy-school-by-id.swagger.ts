export const findPhilosophySchoolByIdSwagger = {
  description: 'Route to create a new philosophy school',
  tags: ['PhilosophySchool'],
  security: [{ Bearer: [] }],
  summary: 'Route to create a new philosophy school',
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Philosophy school id',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        philosophySchool: {
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
