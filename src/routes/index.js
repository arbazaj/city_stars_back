/**
 * Created by Izhar Ahmad on 01/01/2019.
 */

var loginRouter = require('./login');
/**
 * Creates an object of the exports module to be able to access controller function
 * @param app exports object connects the url to the controller function
 */

module.exports = function index(app) {
    app.use('/api/login', loginRouter);
};