const Account = require('../models/Account'),
    Exception = require('../utils/Exception')

async function isAccountExist(name) {
    const isExist = await Account.findOne({
        where: { name }
    })
    return !!isExist
}

module.exports = {
    createAccount: async (userId, account) => {
        if (!account.name) {
            throw new Exception(400, 'Account name is required')
        }
        if (await isAccountExist(account.name)) {
            throw new Exception(400, `Account '${account.name}' already exist`)
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