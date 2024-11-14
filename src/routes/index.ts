import express from 'express'
import authRouter from './auth.routes'
import transactionRouter from './transaction.routes'
import userRouter from './user.routes'
import dashboardRouter from './dashboard.routes'
import * as middleware from '../middleware'

const router = express.Router()

router.use('/auth', authRouter)

router.use('/transaction', middleware.verifyToken, transactionRouter)
router.use('/dashboard', middleware.verifyToken, dashboardRouter)

router.use('/user', userRouter)

export default router
