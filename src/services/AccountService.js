const Account = require('../models/Account'),
    Exception = require('../utils/Exception')

async function isAccountExist(name) {
    const account = await Account.findOne({
        where: { name }
    })
    return account?.id
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
    },
    getAccount: async (userId, accountId) => {
        let accounts
        if (accountId) {
            accounts = await Account.findOne({
                where: {
                    uid: userId,
                    id: +accountId
                }
            })
        } else {
            accounts = await Account.findAll({
                where: { uid: userId }
            })
        }
        return accounts
    },
    update: async (userId, accountId, account) => {
        if (!accountId) {
            throw new Exception(400, 'Id is required')
        }

        const existAccountId = await isAccountExist(account.name)

        if (existAccountId && existAccountId !== +accountId) {
            throw new Exception(400, `Account '${account.name}' already exist`)
        }

        await Account.update({
            name: account.name,
            currency: account.currency,
            balance: account.balance,
            show_in_total: account.showInTotal
        },{
            where: {
                uid: userId,
                id: accountId
            }
        })
    },
    deleteAccount: async (userId, accountId) => {
        if (!accountId) {
            throw new Exception(400, 'Id is required')
        }

        const account = await Account.findOne({
            where: {
                uid: userId,
                id: +accountId
            }
        })

        if (!account) {
            throw new Exception(404, `Account with id ${accountId} was not found`)
        }

        await account.destroy()
    }
}