import { Messages } from "..";
import { WithdrawType } from "../types";
import BankAccount from "./BankAccount";

export class SavingsAccount extends BankAccount {
  #interestRate: number;

  constructor(name: string, balance: number, interestRate: number) {
    super(name, balance);
    this.#interestRate = interestRate;
  }

  addInterest(): void {
    const balanceBefore = this.balance;
    this.deposit(this.balance * this.#interestRate, "interest");
  }
}

export class CheckingAccount extends BankAccount {
  #overdraftLimit: number;

  constructor(name: string, balance: number, overdraftLimit: number) {
    super(name, balance);
    this.#overdraftLimit = overdraftLimit;
  }

  get overdraftLimit() {
    return this.#overdraftLimit;
  }

  withdraw(amount: number, type: WithdrawType = "withdraw"): void {
    if (amount - this.balance > this.#overdraftLimit) {
      throw new Error(Messages.overdraftExceeded);
    }

    this.setBalance(this.balance - amount);

    this.setTransaction(
      amount,
      this.balance,
      this.balance < 0 && type === "withdraw"
        ? "overdraft"
        : this.balance < 0 && type === "transfer-out"
        ? "transfer-out"
        : "withdraw"
    );
  }
}
