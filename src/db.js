const { Sequelize } = require("sequelize");

const dbCredentials = {
    name: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
}

module.exports = new Sequelize(dbCredentials.name, dbCredentials.login, dbCredentials.password, {
    dialect: "mysql",
    logging: false
})