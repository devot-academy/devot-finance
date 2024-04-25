import express, { Request, Response } from 'express'
import { getTransactionByUserId } from '../repository/transaction/getByUserId'
import { calculateDashboardData } from '../utils/calculateDashboardData'

const dashboardRouter = express.Router()

dashboardRouter.get('/dashboard', async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const transactions = await getTransactionByUserId(+userId)

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No transactions found for this user.' })
    }

    const dashboardData = calculateDashboardData(transactions)
    res.json(dashboardData)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
})

export default dashboardRouter
