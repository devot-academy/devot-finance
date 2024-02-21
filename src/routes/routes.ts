import express from 'express'
import * as transactionController from '../controllers/transactionController'
import * as userController from '../controllers/userController'
import * as authController from '../controllers/authController'

const router = express.Router()

router.get('/transaction/:id', transactionController.getTransactionById)
router.post('/transaction', transactionController.createTransaction)
router.put('/transaction/:id', transactionController.updateTransaction)
router.get(
  '/transaction/user/:userId',
  transactionController.getTransactionsByUserId
)

router.get('/user', userController.listUsers) // Rota de listagem de usuários
router.post('/user', userController.createUser)

router.post('/auth', authController.authenticateUser)

export default router
