import express, { Request, Response } from 'express'
import * as transactionRepository from '../repository/transaction'
import * as util from '../utils'

const dashboardRouter = express.Router()

dashboardRouter.get('/dashboard', async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const transactions = await transactionRepository.getTransactionByUserId(+userId)

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No transactions found for this user.' })
    }

    const dashboardData = util.calculateDashboardData(transactions)
    res.json(dashboardData)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
})

export default dashboardRouter
