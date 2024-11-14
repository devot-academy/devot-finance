import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.BACKEND_PORT || 3001

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
