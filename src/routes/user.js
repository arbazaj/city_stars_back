const express = require("express");
const router = express.Router();
var userController = require('../controllers/userController');
var middlewares = require('../helpers/middleware');

router.get('/getUser', 
middlewares.authenticate, async  (req, res, next)=> {
  try{
    const userData =  await userController.findUser(req, res);
    res.status(200).json({data: userData});
  }catch(error){
      next(error);
  }
  
})

router.post('/createUser', async  (req, res, next)=> {
  	try{
		const userData =  await userController.createCityStarsUser(req.body);
    	res.status(200).json({data: userData});
  	} catch(error) {	
		next(error);
  	}
})

router.post('/authUser', async  (req, res, next)=> {
	try{
		const userData =  await userController.authUser(req.body);
		res.status(200).json({data: userData});
	} catch(error) {
		next(error);
	}
})

module.exports = router;