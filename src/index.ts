import { Bank } from "./components/Bank";
import BankAccount from "./components/BankAccount";
import { CheckingAccount, SavingsAccount } from "./components/SavingsAccount";

export const enum Messages {
  insufficient = "Insufficient funds",
  overdraftExceeded = "Overdraft limit is exceeded",
  noAccount = "This account doesn't exist",
  noBothAccounts = "One or both accounts don't exist",
}

// Stage 1
const acc = new BankAccount("Alice", 1000);
acc.deposit(500);
acc.withdraw(700);

// Stage 2
const savAcc = new SavingsAccount("Bob", 2000, 0.05);
savAcc.deposit(100);
savAcc.addInterest();
savAcc.withdraw(300);

const checkAcc = new CheckingAccount("Charlie", 500, 300);
checkAcc.withdraw(700);

// Stage 3
const bank = new Bank();
bank.addAccount(acc);
bank.addAccount(savAcc);
bank.addAccount(checkAcc);

bank.transfer(3, 1, 100);
bank.transfer(1, 3, 800);
bank.transfer(2, 3, 500);

console.log("bank accountId 1: ", bank.getAccountHistory(1));
console.log("bank accountId 2: ", bank.getAccountHistory(2));
console.log("bank accountId 3: ", bank.getAccountHistory(3));
