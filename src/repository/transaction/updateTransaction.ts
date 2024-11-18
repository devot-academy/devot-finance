import { conn } from '../../lib/query-builder'
import { TransactionModel } from '../../model/transaction'

export const updateTransaction = async (
  id: string,
  transaction: Partial<Omit<TransactionModel, 'id'>>
): Promise<TransactionModel | null> => {
  try {
    await conn('transaction').where({ id }).update(transaction)

    const updatedTransaction = await getTransactionById(id)
    return updatedTransaction
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getTransactionById = async (
  id: string
): Promise<TransactionModel | null> => {
  try {
    const [transaction] = await conn('transaction').select('*').where({ id })

    return transaction || null
  } catch (error) {
    console.error(error)
    return null
  }
}
