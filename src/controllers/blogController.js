const blogController = {};
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const blogService = require('../services/blog.service')
/**
 * @description
 * Function authControllers is a Entry point for all user
 * @param req {Object} the request object
 * */

blogController.uploadImage = async (req) => {
    try{
        const  url = await blogService.uploadImage(req.file);
        return url;
    } catch(error) {
       throw error
    }
};

blogController.createBlog = async (req) => {
    try {
        const blog = await blogService.createBlog(req);
        return blog;
    } catch(error) {
        throw error;
    }
}

blogController.getApprovedBlogs = async () => {
    try {
        const blogs = await blogService.getApprovedBlogs();
        return blogs;
    } catch(error) {
        throw error;
    }
}

blogController.getApprovedBlog = async (req) => {
    try {
        const blog = await blogService.getApprovedBlog(req);
        return blog;
    } catch(error) {
        throw error;
    }
}

module.exports = blogController;