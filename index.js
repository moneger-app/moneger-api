require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    port = process.env.PORT,
    authRouter = require('./src/auth/router'),
    session = require('express-session'),
    passport = require('passport'),
    SequelizeStore = require('connect-session-sequelize')(session.Store),
    db = require('./src/db')

const sessionStore = new SequelizeStore({ db })

app.use(session({
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

app.use(bodyParser.json())
app.use(authRouter)
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, async() => {
    await sessionStore.sync()
    await db.sync()
    console.log(`Server listening http://localhost:${port}`)
})