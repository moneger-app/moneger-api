const router = require('express').Router(),
    AccountService = require('../services/AccountService'),
    catchError = require('../middleware/catchError')

router.route('/account/')
    .post(catchError(async (req, res, next) => {
        const { name, currency, balance, showInTotal } = req.body
        await AccountService.createAccount(
            req.session.userId,
            {
                name, currency, balance, showInTotal
            }
        )
        res.sendStatus(201)
    }))

    .get( catchError(async (req, res, next) => {
        const accounts = await AccountService.getAccount(req.session.userId, req.query.id)
        res.status(200).send(accounts)
    }))

    .put(catchError(async (req, res, next) => {
        await AccountService.update(req.session.userId, req.query.id, req.body)
        res.sendStatus(201)
    }))

    .delete(catchError(async  (req, res, next) => {
        await AccountService.deleteAccount(req.session.userId, req.query.id)
        res.sendStatus(200)
    }))

module.exports = router