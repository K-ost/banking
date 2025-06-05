import { describe, it, beforeAll, expect } from "@jest/globals";
import { SavingsAccount, CheckingAccount } from "../components/SavingsAccount";

describe("Accounts", () => {
  describe("SavingsAccount", () => {
    let savings: SavingsAccount;

    beforeAll(() => {
      savings = new SavingsAccount("Alice", 2000, 0.05);
    });

    it("addInterest", () => {
      savings.addInterest();
      expect(savings.balance).toBe(2100);
    });
  });

  describe("CheckingAccount", () => {
    let checking: CheckingAccount;

    beforeAll(() => {
      checking = new CheckingAccount("Charlie", 500, 300);
    });

    it("withdrawal with less than balance", () => {
      checking.withdraw(100);
      expect(checking.balance).toBe(400);
    });

    it("withdrawal with less than overdraft limit", () => {
      checking.withdraw(500);
      expect(checking.balance).toBe(-100);
    });

    it("withdrawal with more than overdraft limit", () => {
      expect(() => checking.withdraw(300)).toThrow("Overdraft limit is exceeded");
    });
  });
});
