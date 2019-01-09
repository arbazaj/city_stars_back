var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../../config/config');
var userController = require('../controllers/userController')
module.exports = function (app) {


    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/login/google/callback"
    },
       async function (accessToken, refreshToken, profile, done) {
            return await userController.createUser(profile, accessToken, done);
        }
    ));
}