const Account = require('../models/Account'),
    Exception = require('../utils/Exception'),
    User = require('../models/User')

async function isAccountExist(uid, name) {
    const account = await Account.findOne({
        where: {
            '$User.id$': uid,
            name
        },
        include: [{
            model: User,
        } ]
    })
    return !!account
}

module.exports = {
    createAccount: async (userId, accountData) => {
        if (!accountData.name) {
            throw new Exception(400, 'Account name is required')
        }

        if (await isAccountExist(userId, accountData.name)) {
            throw new Exception(409, `Account with name ${accountData.name} is already exist`)
        }

        try {
            const user = await User.findByPk(userId)
            const account = await Account.create({
                name: accountData.name,
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
        let accounts = []
        if (accountId) {
            accounts.push(
                await Account.findOne({
                    where: {
                        '$User.id$': userId,
                        id: +accountId
                    },
                    include: [ User ]
                }).catch(err => {
                    console.log(err)
                })
            )
        } else {
            accounts = await Account.findAll({
                where: {
                    '$User.id$': userId
                },
                include: [ User ]
            })
        }

        accounts = JSON.parse(JSON.stringify(accounts))
        accounts.forEach(item => { delete item.User })

        return {
            accounts: accounts || [],
            totalCount: accounts?.length || 0
        }
    },
    update: async (userId, accountId, accountData) => {
        if (!accountId) {
            throw new Exception(400, 'Id is required')
        }

        const { name, balance, showInTotal: show_in_total } = accountData

        if (name && await isAccountExist(userId, name)) {
            throw new Exception(409, `Account with name '${name}' is already exist`)
        }

        const account = await Account.findOne({
            where: {
                '$User.id$': userId,
                id: +accountId,

            },
            include: [ User ]
        })

        if (!account) {
            throw new Exception(404, `Account with id ${accountId} was not found`)
        }

        account.update({ name, balance, show_in_total })
    },
    deleteAccount: async (userId, accountId) => {
        if (!accountId) {
            throw new Exception(400, 'Id is required')
        }

        const account = await Account.findOne({
            where: {
                '$User.id$': userId,
                id: +accountId
            },
            include: [ User ]
        })

        if (!account) {
            throw new Exception(404, `Account with id ${accountId} was not found`)
        }

        await account.destroy()
    },

    changeAccountBalance: async (account, transactionType, value) => {
        const isIncoming = transactionType === transactionType.Incoming || transactionType === transactionType.AccountIncoming,
            balance = isIncoming ? account.balance + value  : account.balance - value

        account.update({
            balance
        })
    }
}