import { knex } from '../database/database'

export async function checkDatabaseAvailability() {
  try {
    await knex.raw('SELECT 1')
  } catch (err) {
    console.error(err)
    throw new Error('Database is not connected')
  }
}
