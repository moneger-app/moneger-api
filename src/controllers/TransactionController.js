const router = require('express').Router(),
    catchError = require('../middleware/catchError'),
    TransactionService = require('../services/TransactionService')

router.route('/transaction')
    .post(catchError(async (req, res, next) => {
        await TransactionService.create(req.session.userId, req.query.accountId, req.body)
        res.sendStatus(201)
    }))
    .get(catchError(async (req, res, next) => {
        const transaction = await TransactionService.get(req.session.userId, req.query.id)
        res.status(200).send(transaction)
    }))

router.get('/transactions/:skip/:take', catchError(async (req, res, next) => {
    const transactions = await TransactionService.getTransactionsBySkipTake(req.session.userId, +req.query.accountId, +req.params.skip, +req.params.take)
    res.status(200).send(transactions)
}))

module.exports = router