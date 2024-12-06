import express from 'express'
import * as transactionController from '../controllers/transactionController'
import { verifyToken } from '../middleware'

const transactionRouter = express.Router()

transactionRouter.get('/:id', transactionController.getTransactionById)
transactionRouter.post('/', transactionController.createTransaction)
transactionRouter.put('/:id', transactionController.updateTransaction)
transactionRouter.get(
  '/user/:userId',
  transactionController.getTransactionsByUserId
)
transactionRouter.delete(
  '/:id',
  verifyToken,
  transactionController.deleteTransaction
)

export default transactionRouter
