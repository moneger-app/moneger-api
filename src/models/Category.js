const db = require('../db'),
    { DataTypes } = require('sequelize'),
    User = require('./User'),
    Transaction = require('./Transaction')

const Category = db.define('Category', {
    name: DataTypes.STRING,
    color: DataTypes.STRING(7),
    icon: DataTypes.STRING(24)
}, {
    timestamps: false
})

User.hasMany(Category, {
    allowNull: false,
    foreignKey: 'uid'
})
Category.belongsTo(User, {
    allowNull: false,
    foreignKey: 'uid'
})

// Category.hasMany(Transaction)
// Transaction.hasOne(Category)

module.exports = Category