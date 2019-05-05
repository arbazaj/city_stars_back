const BaseDao = require("./base.dao");
const BlogModel = require("../models/blogs.model");

const blogDao = new BaseDao(BlogModel);

async function createBlog(data) {
    var blog = new BlogModel(data);
    const blogDao = new BaseDao(blog);
    const userData = await blogDao.insertOne(data);
    return userData;
}

module.exports = {
    createBlog,
};