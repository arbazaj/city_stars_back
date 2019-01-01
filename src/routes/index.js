/**
 * Created by Izhar Ahmad on 01/01/2019.
 */


/**
 * Creates an object of the exports module to be able to access controller function
 * @param appObj exports object connects the url to the controller function
 */

module.exports = function(appObj) {
    appObj.get('/api',function(req, res){
        res.send("hello Izhar");
    })
};