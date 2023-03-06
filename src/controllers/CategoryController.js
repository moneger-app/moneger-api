const router = require('express').Router(),
    catchError = require('../middleware/catchError'),
    CategoryService = require('../services/Category')

router.route('/category')
    .post(catchError(async (req, res, next) => {
        await CategoryService.create(req.session.userId, req.body)
        res.sendStatus(200)
    }))


module.exports = router