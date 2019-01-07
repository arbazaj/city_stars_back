var jwt = require('jsonwebtoken');

/**
 * @description
 * Function to generate jwt token.
 * @param user {Object}
 * */
async function generateToken(user) {
    console.log('user', user)
    const token = await jwt.sign({
        data: user.emails[0].value
    }, 'secret', { expiresIn: '7d' });
    return { token: token }
}



module.exports = {
    generateToken
};
