import {
  TRANSACTION_TYPE,
  TransactionStatusValues
} from '../consts/transaction'

const getTransactionTypeName = (type: TransactionStatusValues) => {
  switch (type) {
    case TRANSACTION_TYPE.BALANCE:
      return 'balance'
    case TRANSACTION_TYPE.ESSENTIAL:
      return 'essential'
    case TRANSACTION_TYPE.SUPERFLUOUS:
      return 'nonEssential'
    default:
      return ''
  }
}

const calculateDashboardData = (transactions: any[]) => {
  const essentialExpensesTotal = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.ESSENTIAL)
    .reduce((total, transaction) => total + transaction.value, 0)

  const nonEssentialExpensesTotal = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.SUPERFLUOUS)
    .reduce((total, transaction) => total + transaction.value, 0)

  const totalIncome = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.BALANCE)
    .reduce((total, transaction) => total + transaction.value, 0)

  const balance =
    totalIncome - essentialExpensesTotal - nonEssentialExpensesTotal

  const totalExpenses = essentialExpensesTotal + nonEssentialExpensesTotal

  const emergencyReserve = essentialExpensesTotal * 12

  const incomeDetails = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.BALANCE)
    .map(transaction => ({
      name: getTransactionTypeName(transaction.type),
      value: transaction.value
    }))

  const essentialExpenseDetails = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.ESSENTIAL)
    .map(transaction => ({
      name: getTransactionTypeName(transaction.type),
      value: transaction.value
    }))

  const nonEssentialExpenseDetails = transactions
    .filter(transaction => transaction.type === TRANSACTION_TYPE.SUPERFLUOUS)
    .map(transaction => ({
      name: getTransactionTypeName(transaction.type),
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

export default calculateDashboardData
