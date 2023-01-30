require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    port = process.env.PORT,
    authRouter = require('./src/auth/router'),
    session = require('express-session'),
    passport = require('passport'),
    Sequelize = require('sequelize'),
    SequelizeStore = require('connect-session-sequelize')(session.Store)

const dbCredentials = {
    name: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
}

const sessionStore = new SequelizeStore({
    db: new Sequelize(dbCredentials.name, dbCredentials.login, dbCredentials.password, {
        dialect: "mysql",
        // logging: false
    })
})

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
    console.log(`Server listening http://localhost:${port}`)
})