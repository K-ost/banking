export const enum Messages {
  insufficient = "Insufficient funds",
  overdraftExceeded = "Overdraft limit is exceeded",
  noAccount = "This account doesn't exist",
  noBothAccounts = "One or both accounts don't exist",
}

export type TransactionType =
  | "deposit"
  | "withdraw"
  | "interest"
  | "overdraft"
  | "transfer-in"
  | "transfer-out";

export type WithdrawType = "withdraw" | "transfer-out";

export type Transaction = {
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  timestamp: Date;
};

export type BalanceEvent = "low-balance" | "deposit" | "transfer-in" | "interest";
