import { Messages, Transaction, TransactionType } from "../types";
import BankAccount from "./BankAccount";
import { SavingsAccount } from "./SavingsAccount";

export class Bank {
  #id: number = 1;
  #bills: Map<number, BankAccount> = new Map();
  #authorizedUserId: number | null = null;

  addAccount(account: BankAccount): number {
    const id = this.#id++;
    this.#bills.set(id, account);
    return id;
  }

  totalAssets() {
    return Array.from(this.#bills.values()).reduce(
      (total, bill) => (total += bill.balance),
      0
    );
  }

  #checkAuthorization(id: number) {
    if (this.#authorizedUserId !== id) {
      throw new Error(Messages.noLogged);
    }
  }

  #getAccountOrThrow(id: number): BankAccount {
    const account = this.#bills.get(id);
    if (!account) throw new Error(Messages.noAccount);
    return account;
  }

  deposit(accountId: number, amount: number): void {
    this.#checkAuthorization(accountId);
    this.#getAccountOrThrow(accountId).deposit(amount);
  }

  withdraw(accountId: number, amount: number): void {
    this.#checkAuthorization(accountId);
    this.#getAccountOrThrow(accountId).withdraw(amount);
  }

  applyInterest(accountId: number): void {
    this.#checkAuthorization(accountId);
    const currentAccount = this.#getAccountOrThrow(accountId);
    if (currentAccount && currentAccount instanceof SavingsAccount) {
      currentAccount.addInterest();
    }
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

    if (from === to) {
      throw new Error(Messages.noSameTransfer);
    }

    this.#checkAuthorization(from);

    accFrom.withdraw(amount, "transfer-out");
    accTo.deposit(amount, "transfer-in");
  }

  getAccountHistory(accountId: number, type?: TransactionType): Transaction[] {
    this.#checkAuthorization(accountId);
    const account = this.#getAccountOrThrow(accountId);
    return account.getTransactionHistory(type);
  }

  login(userId: number): void {
    if (!this.#bills.has(userId)) {
      throw new Error(`User with id: ${userId} doesn't exist`);
    }
    this.#authorizedUserId = userId;
  }

  logout(): void {
    this.#authorizedUserId = null;
  }
}
