const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const DB_CONSTANTS = require('../../config/dbConstants'); 

async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            if(token) {
                const decoded = jwt.verify(token, DB_CONSTANTS.TOKEN_SECRET);
                let userData = await userService.getUserByMail(decoded);
                if(userData){
                    req.userData = userData;
                    next();
                }else{
                    return res.status(401).json({
                        message: DB_CONSTANTS.TOKEN_ERROR_MESSAGE.UNAUTHORIZED
                    });
                }
                
            } else {
                return res.status(401).json({
                    message: DB_CONSTANTS.TOKEN_ERROR_MESSAGE.PROVIDE_TOKEN
                });
            }
        } else {
            return res.status(401).json({
                message: DB_CONSTANTS.TOKEN_ERROR_MESSAGE.PROVIDE_TOKEN
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: DB_CONSTANTS.TOKEN_ERROR_MESSAGE.UNAUTHORIZED
        });
    }
}




module.exports = {
    authenticate
};
