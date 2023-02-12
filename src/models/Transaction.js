const { DataTypes } = require('sequelize'),
    db = require('../db'),
    Account = require('../models/Account')

const Transaction = db.define('transaction', {
    type: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT(null, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        len: [0, 255],
        trim: true
    },
    date: DataTypes.DATE
})

Account.hasMany(Transaction, {
    foreignKey: 'account_id',
    allowNull: false,
    onDelete: 'cascade'
})
Transaction.belongsTo(Account, {
    foreignKey: 'account_id',
    allowNull: false
})

module.exports = Transaction