const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const blogController = require('../controllers/blogController');

router.post('/uploadImage', multer.single('image'), async  (req, res, next)=> {
    try{
      const url =  await blogController.uploadImage(req);
      res.status(200).json({data: {
          imageUrl: url
      }});
    } catch(error) {	
      next(error);
    }
})

module.exports = router;