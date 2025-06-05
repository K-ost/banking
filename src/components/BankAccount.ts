import { Messages } from "..";
import { Transaction, TransactionType } from "../types";

export default class BankAccount {
  #balance: number;
  #name: string;
  #transactions: Transaction[] = [];

  constructor(name: string, balance: number) {
    this.#balance = balance;
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  protected setBalance(amount: number) {
    this.#balance = amount;
  }

  protected setTransaction(
    amount: number,
    balanceAfter: number,
    type: TransactionType
  ): void {
    this.#transactions.push({
      amount,
      balanceAfter,
      timestamp: new Date(),
      type,
    });
  }

  deposit(amount: number, type: TransactionType = "deposit"): void {
    this.#balance += amount;
    this.setTransaction(amount, this.#balance, type);
  }

  withdraw(amount: number, type: TransactionType = "withdraw"): void {
    if (amount > this.#balance) {
      throw new Error(Messages.insufficient);
    }
    this.#balance -= amount;
    this.setTransaction(amount, this.#balance, type);
  }

  getTransactionHistory(type?: TransactionType): Transaction[] {
    let transactions = Array.from(this.#transactions.values());
    if (type) {
      transactions = transactions.filter((el) => el.type === type);
    }
    return transactions;
  }
}
