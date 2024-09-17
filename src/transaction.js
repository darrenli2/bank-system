// Transaction class to manage transactions
class Transaction {
  // Deposit amount into the account
  static deposit(account, amount) {
      account.deposit(amount);
  }

  // Withdraw amount from the account
  static withdraw(account, amount) {
      account.withdraw(amount);
  }

  // Transfer amount from one account to another

  static transfer(fromAccount, toAccount, amount) {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      console.log(`Transferred ${amount} from ${fromAccount.owner.name} to ${toAccount.owner.name}.`);
  }
}

export default Transaction;