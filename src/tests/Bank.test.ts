import { describe, it, beforeAll, expect } from "@jest/globals";
import BankAccount from "../components/BankAccount";
import { Bank } from "../components/Bank";
import { CheckingAccount, SavingsAccount } from "../components/SavingsAccount";

describe("Bank", () => {
  let bank: Bank;
  let bankAcc: BankAccount;
  let saveAcc: SavingsAccount;
  let checkAcc: CheckingAccount;

  bank = new Bank();
  bankAcc = new BankAccount("Alice", 500);
  saveAcc = new SavingsAccount("John", 1000, 0.05);
  checkAcc = new CheckingAccount("Matthew", 1000, 300);
  bank.addAccount(bankAcc);
  bank.addAccount(saveAcc);
  bank.addAccount(checkAcc);

  describe("Operations while being logged", () => {
    beforeAll(() => {
      bank.login(2);
    });

    it("Deposit", () => {
      bank.deposit(2, 500);
      expect(saveAcc.balance).toBe(1500);
    });

    it("Withdraw", () => {
      bank.withdraw(2, 300);
      expect(saveAcc.balance).toBe(1200);
    });

    it("applyInterest", () => {
      bank.applyInterest(2);
      expect(saveAcc.balance).toBe(1260);
    });

    it("applyInterestToSavings", () => {
      bank.applyInterestToSavings();
      expect(saveAcc.balance).toBe(1323);
    });

    it("Transfer", () => {
      bank.transfer(2, 1, 100);
      expect(saveAcc.balance).toBe(1223);
      expect(bankAcc.balance).toBe(600);
    });

    it("Withdraw overdraft", () => {
      bank.login(3);
      bank.withdraw(3, 1200);
      expect(checkAcc.balance).toBe(-200);
    });

    it("Any operation being unlogged", () => {
      expect(() => bank.deposit(1, 500)).toThrow("Unauthorized access");
      expect(() => bank.deposit(2, 500)).toThrow("Unauthorized access");
    });
  });

  describe("Operation being unlogged", () => {
    it("Logout", () => {
      bank.logout();
      expect(() => bank.deposit(1, 500)).toThrow("Unauthorized access");
    });
  });
});
