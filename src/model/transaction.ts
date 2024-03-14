import { conn } from '../lib/query-builder'

export interface TransactionModel {
  id: number
  user_id: number
  value: number
  date: Date
  description: string
  type: number
}

export const transactionModel = {
  getAllTransactions: async (): Promise<TransactionModel[]> => {
    try {
      const transactions = await conn.select('*').from('transactions')
      return transactions
    } catch (error) {
      throw error
    }
  }
}
