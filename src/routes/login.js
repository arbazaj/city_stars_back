const express = require("express");
const router = express.Router();
var passport = require('passport');

var async = require('async');
var authControllers = require('../controllers/authController');

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/login/failure' }), async function (req, res) {
        let respData = await authControllers.generateJwtToken(req, res);
        res.redirect("http://localhost:4200/login?token="+respData.token);

    });

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
    passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read' ] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/login/failure' }), async function (req, res){
        const respData = await authControllers.generateJwtToken(req, res);
        // res.status(200).json(respData)
        res.redirect("http://localhost:4200/login?token="+respData.token);
    })

router.get('/failure', function (req, res) {
    res.send('login fail')
})


module.exports = router;