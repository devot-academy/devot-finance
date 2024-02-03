import express from 'express'
import * as dotenv from 'dotenv'
import { conn } from './lib/query-builder'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

conn
  .raw('SELECT 1+1 as result')
  .then((result: { result: number }[][]) => {
    console.log(
      'Conexão ao banco de dados bem-sucedida:',
      result[0][0].result === 2 ? 'sucesso' : 'falha'
    )
  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao banco de dados:', error)
  })

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  .on('error', err => {
    console.error('Erro ao iniciar o servidor:', err)
  })
