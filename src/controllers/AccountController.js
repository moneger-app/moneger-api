const router = require('express').Router(),
    AccountService = require('../services/AccountService')

router.post('/account', async (req, res, next) => {
    const { name, currency, balance, showInTotal } = req.body
    await AccountService.createAccount(
        req.session.userId,
        {
            name, currency, balance, showInTotal
        }
    )
    res.sendStatus(204)
})

module.exports = router