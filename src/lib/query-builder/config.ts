import * as dotenv from 'dotenv'

dotenv.config()

interface DbConfig {
  client: string
  connection: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
  migrations: {
    tableName: string
    directory: string
  }
}

const config: DbConfig = {
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: +(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'seu-banco'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations'
  }
}

export default config
