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
    EMAIL_REQUIRED: 'Email and password are required',
    USER_ALREADY_EXIST: 'User with email [0] already exist. Choose another email',
    IN_VALID_LOGIN: 'email and password required',
    USER_NOT_EXIST: `User doesn't exist`,
    INVALID_CREDENTIALS: 'Invalid email or password',
    BLOG_NOT_EXIST: `Blog doesn't exists for specified user`
}
exports.BCRYPT_SALT = 10;

BLOG_STATUSES = new Object();
BLOG_STATUSES['PENDING_APPROVAL'] = 'PENDING_APPROVAL';
BLOG_STATUSES['APPROVED'] = 'APPROVED';
BLOG_STATUSES['REJECTED'] = 'REJECTED';
exports.BLOG_STATUSES = BLOG_STATUSES;
