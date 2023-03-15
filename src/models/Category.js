const db = require('../db'),
    { DataTypes } = require('sequelize')

const Category = db.define('Category', {
    name: DataTypes.STRING,
    color: DataTypes.STRING(7),
    icon: DataTypes.STRING(24)
}, {
    timestamps: false
})

module.exports = Category