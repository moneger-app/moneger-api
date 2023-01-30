const passport = require("passport");
const router = require('express').Router()
require('./GoogleAuth')

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' })
)

router.get('/google/redirect',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/failure'
    })
)
module.exports = router