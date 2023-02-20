const { DataTypes} = require('sequelize'),
    db = require('../db'),
    Account = require('./Account')

const User = db.define('User', {
    google_id: DataTypes.STRING(21),
    first_name: DataTypes.STRING,
    second_name: DataTypes.STRING,
    picture_link: DataTypes.STRING,
    email: DataTypes.STRING,
    currency: DataTypes.STRING(4)
}, {
    timestamps: false
})

User.hasMany(Account, {
    foreignKey: 'uid',
    allowNull: false
})
Account.belongsTo(User, {
    allowNull: false,
    foreignKey: 'uid'
})

module.exports = User