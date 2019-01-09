// const DB_CONSTANTS = require("../../config/dbConstants");
const userService = require("../services/user.service");
const userController = {};
const _ = require("underscore");

/**
 * @description
 * Function register is to create user
 * @param req {Object} the request object
 * @param res {Object} the response object
 * */
userController.createUser = async (profile, accessToken, done) => {
    try{
        await userService.createUser(profile, accessToken);
        return done(null, profile);
    }catch(error){
    }
    
};

userController.findUser = async (req, res)=>{
    try{
        const userData = userService.getUserByMailAndProvider(req.userData);
        return userData;
    }catch(error){
    }
    
}


module.exports = userController;
