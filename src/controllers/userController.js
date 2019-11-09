const userService = require("../services/user.service");
const userController = {};
const _ = require("underscore");
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
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
        return done(error, null)
    }
    
};

userController.createCityStarsUser = async (userData) => {
    try{
        return await userService.createCityStarsUser(userData);
    } catch(error) {
        throw error;
    }
};

userController.findUser = async (req, res)=>{
    try{
        const userData = await userService.getUserByMailAndProvider(req.userData);
        if(userData && Object.keys(userData).length){
            return userData;
        }else throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND, 404)
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    
}

userController.authUser = async (credentials)=>{
    try{
        return await userService.authUser(credentials);
    } catch(error) {
        throw error;
    }
    
}

module.exports = userController;
