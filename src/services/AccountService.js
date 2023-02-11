const Account = require('../models/Account'),
    Exception = require('../utils/Exception'),
    User = require('../models/User')

async function isAccountExist(uid, name) {
    const account = await Account.findOne({
        where: { uid, name }
    })
    return account?.id
}

module.exports = {
    createAccount: async (userId, accountData) => {
        if (!accountData.name) {
            throw new Exception(400, 'Account name is required')
        }

        if (await isAccountExist(userId, +accountData.name)) {
            throw new Exception(409, `Account with name ${accountData.name} is already exist`)
        }

        try {
            const user = await User.findByPk(userId)
            const account = await Account.create({
                name: accountData.name,
                currency: accountData.currency || 'USD',
                balance: accountData.balance || 0,
                show_in_total: accountData.showInTotal ?? true
            },{
                include: [User]
            })

            user.addAccount(account)
        } catch (err) {
            throw new Exception(409, err.parent.code === 'ER_DUP_ENTRY' ?
                `Account with name '${accountData.name}' is already exist` :
                err.parent.sqlMessage
            )
        }
    },
    getAccount: async (userId, accountId) => {
        let accounts
        if (accountId) {
            accounts = await Account.findOne({
                where: {
                    '$User.id$': userId,
                    id: +accountId
                },
                include: [ User ]
            })
        } else {
            accounts = await Account.findAll({
                where: {
                    '$User.id$': userId
                },
                include: [ User ]
            })
        }
        return { accounts, totalCount: accounts.length }
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