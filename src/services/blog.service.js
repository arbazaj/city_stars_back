const cloudinaryHelper = require('../helpers/cloudinary');
const blogDao = require('../dao/blog.dao');
const dbContants = require('../../config/dbConstants')
async function uploadImage(file) {
    let cloudinaryFile =  await cloudinaryHelper.uploadImageToCloudinary(file);
    return cloudinaryFile.secure_url
}

async function createBlog(req) {
    let blogData =  {
        ...req.body,
        user_id: req.userData._id,
        status: dbContants.BLOG_STATUSES['PENDING_APPROVAL']
    }
    let savedBlog = await blogDao.createBlog(blogData);
    return savedBlog;
}

module.exports = {
    uploadImage,
    createBlog
};