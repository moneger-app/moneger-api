const { DataTypes} = require('sequelize'),
    db = require('../db')

module.exports = db.define('User', {
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    googleId: DataTypes.STRING,
    pictureLink: DataTypes.STRING,
    language: DataTypes.STRING,
    profile: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    timestamps: false
})