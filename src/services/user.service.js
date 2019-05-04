const userDao = require("../dao/user.dao");
const _ = require("underscore");
const DB_CONSTANTS = require('../../config/dbConstants');
const CustomError = require('../errors/custom-errors');
const bcrypt = require('bcrypt')
/**
 * @description
 * Function to create user.
 * @param req {object} request object
 * */
async function createUser(profile, accessToken) {
    let userData = {};
    let provider = DB_CONSTANTS.SITE_PROVIDER;
    if(DB_CONSTANTS.PROVIDERS_ARRAY.indexOf(profile.provider) >= 0){
        provider = DB_CONSTANTS.SOCIAL_PROVIDER;
    }
    userData = {
        role: DB_CONSTANTS.ROLES.user,
        email: profile.emails[0].value,
        name: profile.displayName,
        provider : provider,
        gender : profile.gender,
        accessToken: accessToken,
        imageUrl: profile.photos[0].value
    }
	const respData = await userDao.createUser(userData);
	return respData;
}

async function createCityStarsUser(userData) {
    if(userData && userData.email) {
        let existingUser = await userDao.getUserData({email: userData.email});
        if(existingUser) {
            throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.USER_ALREADY_EXIST.customTemplate(existingUser.email), 400) 
        }
        var salt = bcrypt.genSaltSync(DB_CONSTANTS.BCRYPT_SALT);
        var hash = "";
        if(userData.password) {
            hash = bcrypt.hashSync(userData.password, salt);
        }
        userData = {
            ...userData,
            role: DB_CONSTANTS.ROLES.user,
            provider: DB_CONSTANTS.SITE_PROVIDER,
            password: hash
        }
        const respData = await userDao.createUser(userData);
	    return respData;
    } else {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED, 400)
    }
}
 
async function getUserByMailAndProvider(decoded){
    let {provider = null, email = null} = decoded;
    let userData = await userDao.getUserData({provider: provider, email: email});
    return userData;
}

async function authUser(credetials) {

}

module.exports = {
    createUser,
    getUserByMailAndProvider,
    createCityStarsUser
};
