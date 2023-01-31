const { DataTypes} = require('sequelize'),
    db = require('../db')

module.exports = db.define('User', {
    googleId: {
        primaryKey: true,
        type: DataTypes.STRING(21)
    },

    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    pictureLink: DataTypes.STRING,
    language: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    timestamps: false
})