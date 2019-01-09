const userDao = require("../dao/user.dao");
const _ = require("underscore");
const DB_CONSTANTS = require('../../config/dbConstants');


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

async function getUserByMailAndProvider(decoded){
    let {provider = null, email = null} = decoded;
    let userData = await userDao.getUserData({provider: provider, email: email});
    return userData;
}

module.exports = {
    createUser,
    getUserByMailAndProvider
};
