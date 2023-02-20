const User = require("../models/User");
const Exception = require("../utils/Exception");

module.exports = {
    userHandler: async (profile) => {
        try {
            const [row, created] = await User.findOrCreate({
                where: {
                    google_id: profile.sub,
                    first_name: profile.given_name,
                    second_name: profile.family_name,
                    picture_link: profile.picture,
                    email: profile.email,
                    currency: 'USD'
                }
            })
            return row
        } catch (err) {
            // TODO: 400 exception
            console.log(err)
        }
    },
    getProfile: async (id) => {
        return (await User.findByPk(id))
    },
    updateCurrency: async (id, currency) => {
        if (!currency) {
            // TODO: currency enum
            throw new Exception(400, 'Currency is required')
        }
        const user = await User.findByPk(id)
        await user.update({ currency })
    }
}