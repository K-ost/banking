import { describe, it, beforeAll, expect } from "@jest/globals";
import BankAccount from "../components/BankAccount";
import { Bank } from "../components/Bank";
import { CheckingAccount, SavingsAccount } from "../components/SavingsAccount";

describe("Bank", () => {
  let bank: Bank;
  let bankAcc: BankAccount;
  let saveAcc: SavingsAccount;
  let checkAcc: CheckingAccount;

  beforeAll(() => {
    bank = new Bank();
    bankAcc = new BankAccount("Alice", 500);
    saveAcc = new SavingsAccount("John", 1000, 0.05);
    checkAcc = new CheckingAccount("Matthew", 1000, 300);
    bank.addAccount(bankAcc);
    bank.addAccount(saveAcc);
    bank.addAccount(checkAcc);
  });

  it("Getting total assets", () => {
    expect(bank.totalAssets()).toBe(2500);
  });

  it("Applying interest to savings", () => {
    bank.applyInterestToSavings();
    expect(bankAcc.balance).toBe(500);
    expect(saveAcc.balance).toBe(1050);
    expect(checkAcc.balance).toBe(1000);
    expect(bank.totalAssets()).toBe(2550);
  });

  it("Transfer with one or two undefined IDs", () => {
    expect(() => {
      bank.transfer(5, 1, 500);
    }).toThrow("One or both accounts don't exist");
  });

  it("Transfer with when user doesn't have enough money", () => {
    expect(() => {
      bank.transfer(1, 2, 1500);
    }).toThrow("Insufficient funds");
  });

  it("Succesful transfer", () => {
    expect(bankAcc.balance).toBe(500);
    expect(saveAcc.balance).toBe(1050);
    bank.transfer(2, 1, 500);
    expect(bankAcc.balance).toBe(1000);
    expect(saveAcc.balance).toBe(550);
  });
});
