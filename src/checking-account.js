import { Account, AccountType } from './account.js';

// CheckingAccount class to manage checking accounts
class CheckingAccount extends Account {
  constructor(owner, balance = 0) {
      super(owner, AccountType.CHECKING , balance);
  }
}

export default CheckingAccount;
