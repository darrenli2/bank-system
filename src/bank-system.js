// BankSystem class to manage accounts
class BankSystem {
    constructor(name) {
        this.name = name;
        this.accounts = [];
    }

    // Add an account to the bank system
    addAccount(account) {
        this.accounts.push(account);
    }

    // Find accounts by owner
    findAccounts(owner) {
        return this.accounts.filter(account => account.owner === owner);
    }
}

export default BankSystem;