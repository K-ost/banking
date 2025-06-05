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
