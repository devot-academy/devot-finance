import { TransactionStatusValues } from '../consts/transaction'

export interface TransactionModel {
  id: number
  userId: number
  value: number
  date: Date
  description: string
  type: TransactionStatusValues
}
