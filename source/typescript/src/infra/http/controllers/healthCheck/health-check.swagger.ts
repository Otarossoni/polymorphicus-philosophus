export const healthCheckSwagger = {
  description: 'Route to check API health',
  tags: ['Health Check'],
  summary: 'Route to check API health',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        status: { type: 'string', description: 'API status' },
        version: { type: 'string', description: 'API version' },
        uptime: { type: 'number', description: 'Time the API is online' },
        timestamp: { type: 'string', description: 'Current time' },
        environment: { type: 'string', description: 'API environment' },
      },
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
