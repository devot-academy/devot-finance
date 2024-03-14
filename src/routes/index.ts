import express from 'express'
import authRouter from './auth.routes'
import transactionRouter from './transaction.routes'
import userRouter from './user.routes'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/transaction', transactionRouter)
router.use('/user', userRouter)

export default router
