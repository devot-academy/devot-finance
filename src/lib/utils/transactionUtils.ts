import { TransactionModel } from '../../model/transaction'

export const calculateBalance = (transactions: TransactionModel[]): number => {
  return transactions.reduce((balance, transaction) => {
    return balance + transaction.value
  }, 0)
}

export const calculateCategoryExpenses = (
  transactions: TransactionModel[],
  category: number
): number => {
  return transactions
    .filter(transaction => transaction.type === category)
    .reduce((total, transaction) => {
      return total + transaction.value
    }, 0)
}
