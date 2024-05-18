import { Knex, knex as setupKnex } from 'knex'
import { env } from '../env/variables'

const config: Knex.Config = {
  client: 'pg',
  connection: env.DB_CONNECTION_STRING,
}

/** @description Database connection */
export const knex = setupKnex(config)
