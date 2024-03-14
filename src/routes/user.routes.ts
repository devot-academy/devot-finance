import express from 'express'
import * as userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.get('/', userController.listUsers)
userRouter.post('/', userController.createUser)

export default userRouter
