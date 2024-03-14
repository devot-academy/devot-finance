import express from 'express'
import * as authController from '../controllers/authController'

const authRouter = express.Router()

authRouter.post('/', authController.authenticateUser)

export default authRouter
