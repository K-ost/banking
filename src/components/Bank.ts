import { Messages } from "..";
import { Transaction, TransactionType } from "../types";
import BankAccount from "./BankAccount";
import { SavingsAccount } from "./SavingsAccount";

export class Bank {
  #id: number = 1;
  #bills: Map<number, BankAccount> = new Map();

  addAccount(account: BankAccount) {
    this.#bills.set(this.#id, account);
    this.#id++;
  }

  totalAssets() {
    return Array.from(this.#bills.values()).reduce(
      (total, bill) => (total += bill.balance),
      0
    );
  }

  applyInterestToSavings() {
    Array.from(this.#bills.values()).forEach((bill) => {
      if (bill instanceof SavingsAccount) {
        bill.addInterest();
      }
    });
  }

  transfer(from: number, to: number, amount: number): void {
    const accFrom = this.#bills.get(from);
    const accTo = this.#bills.get(to);

    if (!accFrom || !accTo) {
      throw new Error(Messages.noBothAccounts);
    }

    accFrom.withdraw(amount, "transfer-out");
    accTo.deposit(amount, "transfer-in");
  }

  getAccountHistory(accountId: number, type?: TransactionType): Transaction[] {
    const account = this.#bills.get(accountId);
    if (!account) {
      throw new Error(Messages.noAccount);
    }
    return account.getTransactionHistory(type);
  }
}
