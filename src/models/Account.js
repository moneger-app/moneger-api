const { DataTypes} = require('sequelize'),
    db = require('../db')

const Account = db.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    balance: DataTypes.FLOAT,
    show_in_total: DataTypes.BOOLEAN
}, {
    timestamps: false
})

module.exports = Account