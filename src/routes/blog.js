const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const blogController = require('../controllers/blogController');
const validateUser = require('../helpers/middleware');

router.post('/uploadImage',validateUser.authenticate, multer.single('image'), async  (req, res, next)=> {
    try{
      const url =  await blogController.uploadImage(req);
      res.status(200).json({data: {
          imageUrl: url
      }});
    } catch(error) {	
      next(error);
    }
});

router.post('/saveBlog',validateUser.authenticate, async  (req, res, next)=> {
    try{
      const blog =  await blogController.createBlog(req);
      res.status(200).json({data: {
          blog: blog
      }});
    } catch(error) {
        console.log(error)
      next(error);
    }
})

router.get('/approvedBlogs', async  (req, res, next)=> {
    try{
        const blogs =  await blogController.getApprovedBlogs();
        res.status(200).json({data: {
            blogs: blogs,
            count: blogs.length
        }});
    } catch(error) {
        next(error);
    }
})

module.exports = router;