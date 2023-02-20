const router = require('express').Router(),
    UserService = require('../services/UserService'),
    catchError = require('../middleware/catchError')

router.get('/profile', catchError(async (req, res, next) => {
    res.send(await UserService.getProfile(req.session.userId)).status(200)
}))

router.put('/profile/options/currency', catchError(async (req, res, next) => {
    await UserService.updateCurrency(req.session.userId, req.body.currency)
    res.sendStatus(200)
}))

module.exports = router