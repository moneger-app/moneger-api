const { DataTypes} = require('sequelize'),
    db = require('../db')

const Account = db.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true
    },
    currency: DataTypes.STRING(3),
    balance: DataTypes.FLOAT,
    show_in_total: DataTypes.BOOLEAN
}, {
    timestamps: false
})

module.exports = Account