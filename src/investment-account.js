import { Account, AccountType } from './account.js';

// InvestmentAccountType enum for investment account types
const InvestmentAccountType = {
  INDIVIDUAL: 'Individual',
  CORPORATE: 'Corporate',
};
// Individual investment withdrawal limit
const INDIVIDUAL_INVESTMENT_WITHDRAWAL_LIMIT = 500;

// InvestmentAccount class to manage investment accounts
class InvestmentAccount extends Account {
  constructor(owner, accountType, balance = 0) {
      super(owner, `${AccountType.INVESTMENT} (${accountType})`, balance);
      this.accountType = accountType;
  }

  // Withdraw amount from the account
  withdraw(amount) {
      if (this.accountType === InvestmentAccountType.INDIVIDUAL && amount > INDIVIDUAL_INVESTMENT_WITHDRAWAL_LIMIT) {
          throw new Error(`Individual Investment account has a withdrawal limit of $${INDIVIDUAL_INVESTMENT_WITHDRAWAL_LIMIT}.`);
      }
      super.withdraw(amount);
  }
}

export { InvestmentAccount, InvestmentAccountType };