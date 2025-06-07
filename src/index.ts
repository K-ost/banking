import { Bank } from "./components/Bank";
import BankAccount from "./components/BankAccount";
import { CheckingAccount, SavingsAccount } from "./components/SavingsAccount";

// Stage 1
// Условно: создание банка и аккаунтов
const bank = new Bank();
const acc1 = new CheckingAccount("User1", 100, 50);
const acc2 = new SavingsAccount("User2", 200, 0.1);
bank.addAccount(acc1); // получает ID = 1
bank.addAccount(acc2); // ID = 2

// ✅ login + deposit
bank.login(1);
bank.deposit(1, 50); // OK

// ❌ попытка deposit на чужой аккаунт
bank.deposit(2, 50); // Error: Unauthorized access

// ❌ операция без login
bank.logout();
bank.withdraw(1, 50); // Error: Unauthorized access

// ✅ login + transfer to self
bank.login(1);
bank.transfer(1, 1, 30); // OK

// ❌ transfer to чужой аккаунт
bank.transfer(1, 2, 30); // Error

// ❌ applyInterest без login
bank.logout();
bank.applyInterest(2); // Error
