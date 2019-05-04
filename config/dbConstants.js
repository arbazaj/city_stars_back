/**
 * Created by izhar on 01/01/2019.
 */
String.prototype.customTemplate = function (...params) {
    if(params && params.length > 0) {
        var k = this;
        for(var i =0; i < params.length; i++) {
              k = k.replace('['+i+']', params[i])
        }	
        return k;
    }
}

exports.action = new Array();
exports.action.insert = "INSERT";
exports.PROVIDERS_ARRAY = ['google', 'facebook'];
exports.SOCIAL_PROVIDER = 'social';
exports.SITE_PROVIDER = 'cityStars';
exports.TOKEN_SECRET = 'cityStars';
exports.ROLES = {user: 'user', admin: 'admin'}; 
exports.TOKEN_ERROR_MESSAGE = {
    PROVIDE_TOKEN : 'Please provide token',
    UNAUTHORIZED: 'Unauthorized token'
}
exports.ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR : 'Internal server error',
    USER_NOT_FOUND: 'User not found',
    EMAIL_REQUIRED: 'Email is required',
    USER_ALREADY_EXIST: 'User with email [0] already exist. Choose another email',
    IN_VALID_LOGIN: 'Invalid email or password'
}
exports.BCRYPT_SALT = 10;
