import { Request, Response } from 'express'
import * as transactionRepository from '../repository/transaction'
import * as userRepository from '../repository/user'
import { TRANSACTION_TYPE } from '../consts/transaction'
import { TransactionModel } from '../model/transaction'

type TransactionCreate = Omit<TransactionModel, 'id'>

export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id
    const transaction = await transactionRepository.getTransactionByUserId(+id)

    if (!transaction) {
      return res
        .status(404)
        .json({ message: `Transaction with ID ${id} not found.` })
    }

    return res.status(200).json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { value, description, type, userId } = req.body

    if (!value || !description || !type || !userId) {
      return res.status(400).json({ message: 'Incorrect fields' })
    }

    if (
      ![
        TRANSACTION_TYPE.BALANCE,
        TRANSACTION_TYPE.ESSENTIAL,
        TRANSACTION_TYPE.SUPERFLUOUS
      ].includes(type)
    ) {
      return res.status(400).json({ message: 'Invalid transaction type' })
    }

    const existingUser = userRepository.getUserById(userId)

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` })
    }

    await transactionRepository.createTransaction({
      value,
      description,
      type,
      date: new Date(),
      userId
    })

    return res.status(201).json({ message: 'Transaction created successfully' })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params
    const { value, description, type, userId }: Partial<TransactionCreate> =
      req.body

    const existingTransaction = await transactionRepository.getTransactionById(
      id
    )
    if (!existingTransaction) {
      return res
        .status(404)
        .json({ message: `Transaction with ID ${id} not found.` })
    }

    if (userId) {
      const existingUser = await userRepository.getUserById(userId)
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: `User with ID ${userId} not found` })
      }
    }

    if (
      type &&
      ![
        TRANSACTION_TYPE.BALANCE,
        TRANSACTION_TYPE.ESSENTIAL,
        TRANSACTION_TYPE.SUPERFLUOUS
      ].includes(type)
    ) {
      return res.status(400).json({ message: 'Invalid transaction type' })
    }

    const updatedTransaction = await transactionRepository.updateTransaction(
      id,
      {
        value: value === null ? existingTransaction.value : value,
        description:
          description === null ? existingTransaction.description : description,
        type: type === null ? existingTransaction.type : type,
        userId: userId === null ? existingTransaction.userId : userId
      }
    )

    return res.status(200).json(updatedTransaction)
  } catch (error) {
    console.error('Error updating transaction:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const getTransactionsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.userId
    const transactions = await transactionRepository.getTransactionByUserId(
      +userId
    )

    return res.status(200).json(transactions)
  } catch (error) {
    console.error('Error fetching user transactions:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id: transactionId } = req.params

    if (!transactionId) {
      return res.status(400).json({ message: 'ID da transação é obrigatório.' })
    }

    const transaction = await transactionRepository.getTransactionById(
      transactionId
    )

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada.' })
    }

    await transactionRepository.getTransactionById(transactionId)
    return res.status(200).json({ message: 'Transação removida com sucesso.' })
  } catch (error) {
    console.error('Erro ao deletar transação:', error)
    return res.status(500).json({ message: 'Erro ao remover transação.' })
  }
}
