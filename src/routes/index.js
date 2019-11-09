var authRouter = require('./auth');
var userRouter = require('./user');
var blogRouter = require('./blog');
/**
 * Creates an object of the exports module to be able to access controller function
 * @param app exports object connects the url to the controller function
 */

module.exports = function index(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/blog', blogRouter);
};