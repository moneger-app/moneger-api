const User = require("../models/User");

module.exports = {
    userHandler: async (profile) => {
        try {
            const [row, created] = await User.findOrCreate({
                where: {
                    googleId: profile.sub,
                    firstName: profile.given_name,
                    secondName: profile.family_name,
                    pictureLink: profile.picture,
                    email: profile.email
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
    }
}