import { knex } from 'knex'
import 'dotenv/config'

const {
  DATADASE_HOST,
  DATADASE_PORT,
  DATADASE_USER,
  DATADASE_PASSWORD,
  DATADASE_NAME
} = process.env

export const connection = knex({
  client: 'mysql',
  connection: {
    host: DATADASE_HOST,
    port: Number(DATADASE_PORT),
    user: DATADASE_USER,
    password: DATADASE_PASSWORD,
    database: DATADASE_NAME
  }
})
