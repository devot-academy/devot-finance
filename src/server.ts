import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT || 3001


app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  const { password } = req.body;
  console.log(password)
  if(password === '123456') {
    return next()
  }
  res.status(401).json({ message: 'Usuário não possui autorização' })
})

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
