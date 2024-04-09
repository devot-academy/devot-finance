import { conn } from '../../lib/query-builder'
import { TransactionModel } from '../../model/transaction'

export const getTransactionByUserId = async (
  userId: number
): Promise<TransactionModel[]> => {
  try {
    if (!userId) throw new Error('User ID is required')

    const transactions = await conn
      .select('*')
      .from('transaction')
      .where({ userId })

    return transactions
  } catch (error) {
    console.error(error)
    return []
  }
}
