// const utils = require("../utils/common");
const authControllers = {};
const generateTokenService = require('../services/generateTokenService');
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const userService = require("../services/user.service");

/**
 * @description
 * Function authControllers is a Entry point for all user
 * @param req {Object} the request object
 * */

authControllers.generateJwtToken = async (req, res) => {
    try{
        const  token = await generateTokenService.generateToken(req.user);
        return token;
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    
};

authControllers.authUser = async (credentials)=>{
    try{
        return await userService.authUser(credentials);
    } catch(error) {
        throw error;
    }
    
}

module.exports = authControllers;
