import { Request, Response } from 'express'

export const getAllTransactions = (req: Request, res: Response) => {
  res.json({ message: 'Obtendo todas as transações...' })
}

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ message: 'Obtendo todos os usuários...' })
}
