require('dotenv').config()

const express = require('express'),
    app = express(),
    port = process.env.PORT,
    authRouter = require('./src/auth/router'),
    router = require('./src/controllers'),
    session = require('express-session'),
    SequelizeStore = require('connect-session-sequelize')(session.Store),
    db = require('./src/db'),
    cors = require('cors'),
    checkAuthMiddleware = require('./src/middleware/auth')

const sessionStore = new SequelizeStore({ db })

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())

app.use(session({
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(authRouter)
app.use(checkAuthMiddleware, router)

app.listen(port, async() => {
    await sessionStore.sync()
    await db.sync()
    console.log(`Server listening http://localhost:${port}`)
})