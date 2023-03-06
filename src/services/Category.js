const Category = require('../models/Category'),
    User = require('../models/User')

module.exports = {
    create: async (userId, { name, color, icon }) => {
        const user = await User.findByPk(userId)

        const category = await Category.create({
            name, color, icon
        }, {
            include: [User]
        })

        user.addCategory(category)
    },
    getCategories: async (userId) => {
        const categories = await Category.findAll({
            where: {
                '$User.id$': userId
            },
            include: [User]
        })
        categories.forEach(item => { delete item.User })
        return {
            totalCount: categories.length,
            categories
        }
    }
}