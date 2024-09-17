import BankSystem from './bank-system.js';
import { InvestmentAccount, InvestmentAccountType } from './investment-account.js';
import CheckingAccount from './checking-account.js';
import Transaction from './transaction.js';
import User from './user.js';

// Test suite for Bank System
describe("Bank System", function() {
  // create bank
  const bank = new BankSystem('Bank of America');

  // create users
  const john = new User(1, 'John Smith', 'john@email.com')
  const jason = new User(2, 'Jason Hill', 'jason@corp.com')
  const jane = new User(3, 'Jane Doe', 'jane@email.com')
  let checkingAccount;
  let individualInvestmentAccount;
  let corporateInvestmentAccount;


  describe("Test Bank name and Getting Accounts", function() {
    beforeAll(() => {
      bank.accounts = [];
      checkingAccount = new CheckingAccount(john, 1000);
      bank.addAccount(checkingAccount);
      individualInvestmentAccount = new InvestmentAccount(john, InvestmentAccountType.INDIVIDUAL , 5000);
      corporateInvestmentAccount = new InvestmentAccount (jason, InvestmentAccountType.CORPORATE, 20000);
      bank.addAccount(individualInvestmentAccount);
      bank.addAccount(corporateInvestmentAccount)
    })

    it("should get bank name", function() {
      expect(bank.name).toEqual('Bank of America');
    });

    it("should get all accounts for a user with multiple accounts", function() {
      expect(bank.findAccounts(john)).toEqual([checkingAccount, individualInvestmentAccount]);
    });

    it("should get all accounts for a user with one account", function() {
      expect(bank.findAccounts(jason)).toEqual([corporateInvestmentAccount]);
    });

    it("should get empty array for a user with no accounts", function() {
      expect(bank.findAccounts(jane)).toEqual([]);
    });
  });

  describe("Test Transactions", function() {
    describe(" Test Withdrawal", function() { 
      beforeAll(() => {
        bank.accounts = [];
        checkingAccount = new CheckingAccount(john, 1000);
        bank.addAccount(checkingAccount);
        individualInvestmentAccount = new InvestmentAccount(john, InvestmentAccountType.INDIVIDUAL , 5000);
        corporateInvestmentAccount = new InvestmentAccount (jason, InvestmentAccountType.CORPORATE, 20000);
        bank.addAccount(individualInvestmentAccount);
        bank.addAccount(corporateInvestmentAccount)      
      });

      describe("Test Withdrawal negative amount", function() { 
        it("should throw error for withdrawal with negative amount for checking account", function() {
          expect(
            () => Transaction.withdraw(checkingAccount, -100)
            ).toThrow(new Error('Withdrawal amount should be positive.'));
        });

        it("should throw error for withdrawal with negative amount for investment individual account", function() {
          expect(
            () => Transaction.withdraw(individualInvestmentAccount, -100)
            ).toThrow(new Error('Withdrawal amount should be positive.'));
          });
      });

      describe("Test Withdrawal amount greater than balance", function() {
        it("should throw error for withdrawal with amount greater than balance for checking account", function() {
          expect(
            () => Transaction.withdraw(checkingAccount, 2000)
            ).toThrow(new Error('Insufficient fund for withdrawal.'));
        });

        it("should throw error for withdrawal with amount greater than balance for investment corporate account", function() {
          expect(
            () => Transaction.withdraw(corporateInvestmentAccount, 20001)
            ).toThrow(new Error('Insufficient fund for withdrawal.'));
          });
      });

      describe("Test Withdrawal amount greater than withdrawal limit", function() {
        it("should throw error for withdrawal with amount greater than withdrawal limit for investment individual account", function() {
          expect(
            () => Transaction.withdraw(individualInvestmentAccount, 501)
            ).toThrow(new Error('Individual Investment account has a withdrawal limit of $500.'));
        });
      });

      describe("Test valid withdrawal", function() {
        it("should withdraw amount from investment individual account", function() {
            Transaction.withdraw(individualInvestmentAccount, 200)
            expect(individualInvestmentAccount.balance).toEqual(4800);
        });

        it("should withdraw amount from checking account", function() {
          Transaction.withdraw(checkingAccount, 200)
          expect(checkingAccount.balance).toEqual(800);
        });

        it("should withdraw amount from  investment corporate account", function() {
          Transaction.withdraw(corporateInvestmentAccount, 10000)
          expect(corporateInvestmentAccount.balance).toEqual(10000);
        });
      });
    });

    describe(" Test deposit", function() { 
      beforeAll(() => {
        bank.accounts = [];
        checkingAccount = new CheckingAccount(john, 1000);
        bank.addAccount(checkingAccount);
        individualInvestmentAccount = new InvestmentAccount(john, InvestmentAccountType.INDIVIDUAL , 5000);
        corporateInvestmentAccount = new InvestmentAccount (jason, InvestmentAccountType.CORPORATE, 20000);
        bank.addAccount(individualInvestmentAccount);
        bank.addAccount(corporateInvestmentAccount)      
      });

      describe("Test deposit negative amount", function() {
        it("should throw error for deposit with negative amount for checking account", function() {
          expect(
            () => Transaction.deposit(checkingAccount, -100)
            ).toThrow(new Error('Deposit amount should be positive.'));
        });

        it("should throw error for deposit with negative amount for investment account", function() {
          expect(
            () => Transaction.deposit(individualInvestmentAccount, -100)
            ).toThrow(new Error('Deposit amount should be positive.'));
        });

        it("should throw error for deposit with negative amount for corporate investment account", function() {
          expect(
            () => Transaction.deposit(corporateInvestmentAccount, -100)
            ).toThrow(new Error('Deposit amount should be positive.'));
        });
      });

      describe("Test valid deposit", function() {
        it("should deposit amount to investment individual account", function() {
          Transaction.deposit(individualInvestmentAccount, 5000)
          expect(individualInvestmentAccount.balance).toEqual(10000);
        });

        it("should deposit amount to checking account", function() {
          Transaction.deposit(checkingAccount, 500)
          expect(checkingAccount.balance).toEqual(1500);
        });

        it("should deposit amount to corporate investment account", function() {
          Transaction.deposit(corporateInvestmentAccount, 10000)
          expect(corporateInvestmentAccount.balance).toEqual(30000);
        });
      });
    });

    describe("Test Transfer", function() {
      beforeAll(() => {
        bank.accounts = [];
        checkingAccount = new CheckingAccount(john, 1000);
        bank.addAccount(checkingAccount);
        individualInvestmentAccount = new InvestmentAccount(john, InvestmentAccountType.INDIVIDUAL , 5000);
        corporateInvestmentAccount = new InvestmentAccount (jason, InvestmentAccountType.CORPORATE, 20000);
        bank.addAccount(individualInvestmentAccount);
        bank.addAccount(corporateInvestmentAccount)      
      });

      describe("Test Transfer negative amount", function() {
        it("should throw error for transfer with negative amount for checking account", function() {
          expect(
            () => Transaction.transfer(checkingAccount, individualInvestmentAccount, -100)
            ).toThrow(new Error('Withdrawal amount should be positive.'));
        });
      });

      describe("Test Transfer amount greater than balance", function() {  
        it("should throw error for transfer with amount greater than balance for checking account", function() {
          expect(
            () => Transaction.transfer(checkingAccount, individualInvestmentAccount, 2000)
            ).toThrow(new Error('Insufficient fund for withdrawal.'));
        });

        it("should throw error for transfer with amount greater than transfer limit for investment individual account", function() {
          expect(
            () => Transaction.transfer(individualInvestmentAccount, corporateInvestmentAccount, 501)
            ).toThrow(new Error('Individual Investment account has a withdrawal limit of $500.'));
        });
      });

      describe("Test valid transfer", function() {  
        it("should transfer amount from one account to another", function() {
          Transaction.transfer(checkingAccount, individualInvestmentAccount, 500)
          expect(checkingAccount.balance).toEqual(500);
          expect(individualInvestmentAccount.balance).toEqual(5500);
        });
      });
    });
  });
});
