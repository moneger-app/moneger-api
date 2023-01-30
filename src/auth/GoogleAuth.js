const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/User')

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        const [row, created] = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: {
                firstName: profile.given_name,
                secondName: profile.family_name,
                googleId: profile.id,
                pictureLink: profile.picture,
                language: profile.language,
                email: profile.email
            }
        })
        return done(null, profile)
    }
));

passport.serializeUser((user, done) => {
    const userDto = {
        id: user.id,
    }
    done(null, userDto)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})