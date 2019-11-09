var jwt = require('jsonwebtoken');
var DB_CONSTANTS = require('../../config/dbConstants');

/**
 * @description
 * Function to generate jwt token.
 * @param user {Object}
 * */
async function generateToken(user) {
    return await getToken(user.email, DB_CONSTANTS.SITE_PROVIDER)
}

async function getToken (email, provider) {
    const token = await jwt.sign({
        email: email,
        provider: provider
    }, DB_CONSTANTS.TOKEN_SECRET, { expiresIn: '7d' });
    return { token: token }
}


module.exports = {
    generateToken
};
