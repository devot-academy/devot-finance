export const TRANSACTION_TYPE = {
  BALANCE: 1,
  ESSENTIAL: 2,
  SUPERFLUOUS: 3
} as const

export type KEY_TRANSACTION_STATUS = keyof typeof TRANSACTION_TYPE
export type TransactionStatusValues =
  (typeof TRANSACTION_TYPE)[KEY_TRANSACTION_STATUS]
