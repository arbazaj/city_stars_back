var jwt = require('jsonwebtoken');
var DB_CONSTANTS = require('../../config/dbConstants');

/**
 * @description
 * Function to generate jwt token.
 * @param user {Object}
 * */
async function generateToken(user) {
    let provider = DB_CONSTANTS.SITE_PROVIDER;
    if(DB_CONSTANTS.PROVIDERS_ARRAY.indexOf(user.provider) >= 0){
        provider = DB_CONSTANTS.SOCIAL_PROVIDER;
    }
    const token = await jwt.sign({
        email: user.emails[0].value,
        provider: provider
    }, DB_CONSTANTS.TOKEN_SECRET, { expiresIn: '7d' });
    return { token: token }
}



module.exports = {
    generateToken
};
