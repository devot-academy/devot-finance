import { conn } from '../../lib/query-builder'
import { TransactionModel } from '../../model/transaction'

export const createTransaction = async (
  transaction: Omit<TransactionModel, 'id'>
) => {
  try {
    await conn('transaction').insert(transaction)
  } catch (error) {
    console.error(error)
  }
}
