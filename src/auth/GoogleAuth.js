const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
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