export const fetchPhilosophySchoolsSwagger = {
  description: 'Route to fetch all philosophy schools',
  tags: ['PhilosophySchool'],
  security: [{ Bearer: [] }],
  summary: 'Route to fetch all philosophy schools',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        philosophySchools: {
          type: 'array',
          items: {
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
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
