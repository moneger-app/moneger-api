const router = require('express').Router(),
    UserService = require('../services/UserService')

router.get('/profile', async (req, res, next) => {
    res.send(await UserService.getProfile(req.session.userId)).status(200)
})

module.exports = router