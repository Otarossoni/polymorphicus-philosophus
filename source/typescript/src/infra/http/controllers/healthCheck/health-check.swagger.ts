export const healthCheckSwagger = {
  description: 'Route to check API health',
  tags: ['Health Check'],
  summary: 'Route to check API health',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        status: { type: 'string' },
        version: { type: 'string' },
        uptime: { type: 'number' },
        timestamp: { type: 'string' },
        environment: { type: 'string' },
      },
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
