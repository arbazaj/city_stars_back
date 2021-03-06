var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../../config/config');
// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
module.exports = function (app) {
    passport.use(new FacebookStrategy({
        clientID: config.FB_APP_ID,
        clientSecret: config.FB_APP_SECRET,
        callbackURL: "/api/login/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        async function (accessToken, refreshToken, profile, done) {
            return await userController.createUser(profile, accessToken, done);
        }
    ));
    app.use(passport.initialize());

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  In a
    // production-quality application, this would typically be as simple as
    // supplying the user ID when serializing, and querying the user record by ID
    // from the database when deserializing.  However, due to the fact that this
    // example does not have a database, the complete Facebook profile is serialized
    // and deserialized.
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
