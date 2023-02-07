const Account = require('../models/Account')

module.exports = {
    createAccount: async (userId, account) => {
        if (!account.name) {
            console.log('required field')
            // TODO: throw error name is required
        }

        await Account.create({
            uid: userId,
            name: account.name,
            currency: account.currency || 'USD',
            balance: account.balance || 0,
            show_in_total: account.showInTotal ?? true
        })
    }
}