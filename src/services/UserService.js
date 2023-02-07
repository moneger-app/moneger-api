const User = require("../models/User");

module.exports = {
    userHandler: async (profile) => {
        try {
            const [row, created] = await User.findOrCreate({
                where: {
                    google_id: profile.sub,
                    first_name: profile.given_name,
                    second_name: profile.family_name,
                    picture_link: profile.picture,
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