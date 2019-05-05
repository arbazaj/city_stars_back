/**
 * Created by Izhar Ahmad on 01/01/2019.
 */

var loginRouter = require('./login');
var userRouter = require('./user');
var blogRouter = require('./blog');
/**
 * Creates an object of the exports module to be able to access controller function
 * @param app exports object connects the url to the controller function
 */

module.exports = function index(app) {
    app.use('/api/login', loginRouter);
    app.use('/api/user', userRouter);
    app.use('/api/blog', blogRouter);
};