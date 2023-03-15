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

// TODO: delete in prod
const AccountService = require('../services/AccountService'),
    CategoryService = require('../services/CategoryService')
router.get('/db-fill', catchError(async(req, res, next) => {
    await AccountService.createAccount(
        req.session.userId,
        {
            name: 'first', currency: 'KZT', balance: '100000', showInTotal: true
        }
    )
    await AccountService.createAccount(
        req.session.userId,
        {
            name: 'second', balance: '20000', showInTotal: false
        }
    )
    await CategoryService.create(req.session.userId, {name: '1', color: '#ffffff', icon: 'mdi-icon'})
    await CategoryService.create(req.session.userId, {name: '2', color: '#ffffff', icon: 'mdi-icon'})
    await CategoryService.create(req.session.userId, {name: '3', color: '#ffffff', icon: 'mdi-icon'})
    res.sendStatus(200)
}))

module.exports = router