import express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
