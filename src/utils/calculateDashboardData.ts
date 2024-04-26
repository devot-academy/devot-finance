import {
  TRANSACTION_TYPE,
} from '../consts/transaction'

import { TransactionModel } from '../model/transaction'

export const calculateTest = () => {}

export const calculateDashboardData = (transactions: TransactionModel[]) => {
  const essencialTransactions = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.ESSENTIAL)

  const superfluousTransactions = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.SUPERFLUOUS)

  const balanceTransactions = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.BALANCE)

  const essentialExpensesTotal = essencialTransactions
    .reduce((total, transaction) => total + transaction.value, 0)

  const nonEssentialExpensesTotal = superfluousTransactions
    .reduce((total, transaction) => total + transaction.value, 0)

  const totalIncome = balanceTransactions
    .reduce((total, transaction) => total + transaction.value, 0)

  const balance =
    totalIncome - essentialExpensesTotal - nonEssentialExpensesTotal

  const totalExpenses = essentialExpensesTotal + nonEssentialExpensesTotal

  const emergencyReserve = essentialExpensesTotal * 12

  const incomeDetails = balanceTransactions
    .map(transaction => ({
      name: transaction.description,
      value: transaction.value
    }))

  const essentialExpenseDetails = essencialTransactions
    .map(transaction => ({
      name: transaction.description,
      value: transaction.value
    }))

  const nonEssentialExpenseDetails = superfluousTransactions
    .map(transaction => ({
      name: transaction.description,
      value: transaction.value
    }))

  return {
    totalIncome,
    incomes: incomeDetails,
    essentialExpensesTotal,
    essentialExpenses: essentialExpenseDetails,
    nonEssentialExpensesTotal,
    nonEssentialExpenses: nonEssentialExpenseDetails,
    balance,
    totalExpenses,
    emergencyReserve
  }
}

