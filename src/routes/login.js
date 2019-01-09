const express = require("express");
const router = express.Router();
var passport = require('passport');
const config = require('../../config/config');
var authControllers = require('../controllers/authController');


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/login/failure' }), async function (req, res, next) {
        try{
            const respData = await authControllers.generateJwtToken(req, res);
            res.redirect(config.APP_BASE_URL + "login?token=" + respData.token);
        }catch(error){
            next(error);
        }
    });

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/login/failure' }), async function (req, res, next) {
        try{
            const respData = await authControllers.generateJwtToken(req, res);
            res.redirect(config.APP_BASE_URL +"login?token=" + respData.token);
        }catch(error){
            next(error);
        }
        
    })

router.get('/failure', function (req, res) {
    res.redirect(config.APP_BASE_URL+"login");
})


module.exports = router;