import { app } from './app'
import { env } from './env/variables'

import { checkDatabaseAvailability } from './env/database'

const apiPort: number = env.PORT
const apiHost: string = '0.0.0.0'

app
  .listen({
    port: apiPort,
    host: apiHost,
  })
  .then(async () => {
    await checkDatabaseAvailability()
    console.log(`HTTP server running on http://localhost:${apiPort}`)
  })
