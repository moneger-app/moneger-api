const router = require('express').Router()
const getVerifiedUserData = require("./GoogleAuth")
const UserService = require("../services/UserService");

router.post('/google/auth', async (req, res) => {
    const profile = await getVerifiedUserData(req.body.token)
    const user = await UserService.userHandler(profile)
    if (!req.session.userId) {
        req.session.userId = user.id
        req.session.save()
    }
    res.send({ user }).status(200)
})

module.exports = router