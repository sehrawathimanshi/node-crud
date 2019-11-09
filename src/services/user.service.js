const userDao = require("../dao/user.dao");
const _ = require("underscore");
const DB_CONSTANTS = require('../../config/dbConstants');
const CustomError = require('../errors/custom-errors');
const bcrypt = require('bcrypt');
const tokenService = require('./generateTokenService');

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
    console.log(userData)
    if(userData && userData.email) {
        let existingUser = await userDao.getUserData({email: userData.email, provider: DB_CONSTANTS.SITE_PROVIDER});
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
 
async function getUserByMail(decoded){
    let {provider = null, email = null} = decoded;
    let userData = await userDao.getUserData({email: email});
    return userData;
}

async function authUser(credentials) {
    console.log(credentials)
    if(credentials.email && credentials.password) {
        let existingUser = await userDao.getUserData({email: credentials.email, provider: DB_CONSTANTS.SITE_PROVIDER});
        if(existingUser) {
            let isValidLogin = bcrypt.compareSync(credentials.password.toString(), existingUser.password);
            if(isValidLogin) {
                let token = await tokenService.generateToken(existingUser);
                return {
                    ...existingUser,
                    accessToken: token.token
                }
            } else {
                throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS, 401)
            }
        } else {
            throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.USER_NOT_EXIST, 401);
        }
    } else {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.IN_VALID_LOGIN, 400);
    }
}

module.exports = {
    createUser,
    getUserByMail,
    createCityStarsUser,
    authUser
};
