import * as dotenv from 'dotenv'

dotenv.config()

export default {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'seu-banco'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations'
  }
}
