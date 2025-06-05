import { describe, it, beforeAll, expect } from "@jest/globals";
import BankAccount from "../components/BankAccount";

describe("BankAccount", () => {
  let bank: BankAccount;

  beforeAll(() => {
    bank = new BankAccount("Alice", 1000);
  });

  it("Init bank", () => {
    expect(bank.balance).toBe(1000);
  });

  it("Add funds to account", () => {
    bank.deposit(500);
    expect(bank.balance).toBe(1500);
  });

  it("Withdraw money from account", () => {
    bank.withdraw(300);
    expect(bank.balance).toBe(1200);
  });

  it("Attempt to withdraw more funds than it is", () => {
    expect(() => bank.withdraw(1500)).toThrow("Insufficient funds");
  });

  it("Getting transaction history inside BankAccount", () => {
    const history = bank.getTransactionHistory();
    expect(history).toHaveLength(2);
  });

  it("Getting transaction history with filter", () => {
    const history = bank.getTransactionHistory("deposit");
    expect(history.every((el) => el.type === "deposit"));
  });
});
