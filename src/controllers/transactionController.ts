import { Request, Response } from 'express'

export const getTransactionById = (req: Request, res: Response) => {
  const id = req.params.id
  res.send(`Obter transação com o ID ${id}`)
}

export const createTransaction = (req: Request, res: Response) => {
  const { userId, value, description, type } = req.body

  const newTransaction = {
    id: 1,
    userId,
    value,
    description,
    type,
    date: new Date()
  }

  res.status(201).json(newTransaction)
}

export const updateTransaction = (req: Request, res: Response) => {
  const id = req.params.id
  const { value, description, type } = req.body

  const updatedTransaction = {
    id: +id,
    userId: 1,
    value,
    description,
    type,
    date: new Date()
  }

  res.json(updatedTransaction)
}

export const getTransactionsByUserId = (req: Request, res: Response) => {
  const userId = req.params.userId
  const transactions = [
    {
      id: 1,
      userId: +userId,
      value: 50,
      description: '',
      type: 1,
      date: new Date()
    },
    {
      id: 2,
      userId: +userId,
      value: -20,
      description: '',
      type: 2,
      date: new Date()
    }
  ]

  res.json(transactions)
}
