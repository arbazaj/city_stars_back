const cloudinaryHelper = require('../helpers/cloudinary');
const blogDao = require('../dao/blog.dao');
const dbConstants = require('../../config/dbConstants')
async function uploadImage(file) {
    let cloudinaryFile =  await cloudinaryHelper.uploadImageToCloudinary(file);
    return cloudinaryFile.secure_url
}

async function createBlog(req) {
    let blogData =  {
        ...req.body,
        user_id: req.userData._id,
        status: dbConstants.BLOG_STATUSES['PENDING_APPROVAL']
    }
    let savedBlog = await blogDao.createBlog(blogData);
    return savedBlog;
}

async function getApprovedBlogs() {
    let query = {
        status: dbConstants.BLOG_STATUSES['PENDING_APPROVAL']
    }
    let savedBlog = await blogDao.getApprovedBlogs(query);
    return savedBlog;
}

async function getApprovedBlog(req) {
    let query = {
        status: dbConstants.BLOG_STATUSES['PENDING_APPROVAL'],
        _id: req.params.id
    }
    let savedBlog = await blogDao.getApprovedBlog(query);
    return savedBlog;
}

module.exports = {
    uploadImage,
    createBlog,
    getApprovedBlogs,
    getApprovedBlog
};