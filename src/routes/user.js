const express = require("express");
const router = express.Router();
var passport = require('passport');

var async = require('async');
var authControllers = require('../controllers/authController');
var userController = require('../controllers/userController');
var middlewares = require('../helpers/middleware');

router.get('/getUser', 
middlewares.authenticate, async  (req, res)=> {
  const userData =  await userController.findUser(req, res);
  res.status(200).json({data: userData});
})
module.exports = router;