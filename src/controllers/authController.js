// const utils = require("../utils/common");
const authControllers = {};
const generateTokenService = require('../services/generateTokenService');
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
        
    }
    
};



module.exports = authControllers;
