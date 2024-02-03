import { knex } from 'knex'

import config from './config'

export const conn = knex(config)
