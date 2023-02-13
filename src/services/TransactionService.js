const Account = require('../models/Account'),
    Transaction = require('../models/Transaction'),
    User = require('../models/User'),
    Exception = require('../utils/Exception'),
    TransactionTypes = require('../enums/transactionTypes')
const {changeAccountBalance} = require("./AccountService");

async function findAccount(userId, accountId) {
    return (await Account.findOne({
        where: {
            '$User.id$': userId,
            id: accountId
        },
        include: [ User ]
    }))
}

module.exports = {
    create: async (userId, accountId, transactionData) => {
        const account = await findAccount(userId, accountId)

        if (!accountId) {
            throw new Exception(400, `AccountId is required`)
        }

        if (!account) {
            throw new Exception(400, `Account with id ${accountId} was not found`)
        }

        if (typeof transactionData.type !== 'number' || !transactionData.value) {
            throw new Exception(400, `type and value parameters are required`)
        }

        const transaction = await Transaction.create({
            type: transactionData.type,
            description: transactionData.description,
            value: transactionData.value.toFixed(2),
            date: transactionData.date || Date.now()
        }).catch(err => {
            console.log(err)
        })

        account.addTransaction(transaction)

        await changeAccountBalance(account, transaction.type, transaction.value)
    },
    get: async (userId, transactionId) => {
        const transaction = await Transaction.findByPk(transactionId)
        const account = await findAccount(userId, transaction.account_id)

        if (!account) {
            throw new Exception(404, `Transaction with id ${transactionId} was not found`)
        }

        return transaction
    },
    update: async () => {

    },
    delete: async () => {

    },
    getTransactionsBySkipTake: async (userId, accountId, skip, take) => {
        if (!accountId) {
            throw new Exception(400, `AccountId is required`)
        }

        if (!(await findAccount(userId, accountId))) {
            throw new Exception(404, `Account with id ${accountId} was not found`)
        }

        let transactions = await Transaction.findAll({
            where: {
                '$Account.id$': accountId
            },
            include: [ Account ],
            offset: skip,
            limit: take
        }).catch(err => {
            console.log(err)
        })

        transactions = JSON.parse(JSON.stringify(transactions))
        transactions.forEach(item => { delete item.Account })

        return {
            transactions: transactions || [],
            totalCount: transactions?.length || 0
        }
    }
}