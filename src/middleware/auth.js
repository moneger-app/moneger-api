module.exports = (req, res, next) => {
    req.session.userId ? next() : res.sendStatus(401)
}