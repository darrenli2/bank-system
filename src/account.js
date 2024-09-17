// AccountType enum to manage account types
const AccountType = {
  CHECKING: 'Checking',
  INVESTMENT: 'Investment',
};

// Base class for all accounts
class Account {
  constructor(owner, type, balance = 0) {
      this.owner = owner;
      this.type = type;
      this.balance = balance;
  }

  // Deposit amount into the account
  deposit(amount) {
      if (amount <= 0) throw new Error('Deposit amount should be positive.');
      this.balance += amount;
  }

  // Withdraw amount from the account
  withdraw(amount) {
      if (amount <= 0) throw new Error('Withdrawal amount should be positive.');
      if (this.balance < amount) throw new Error('Insufficient fund for withdrawal.');
      this.balance -= amount;
  }
}

export { Account, AccountType };
