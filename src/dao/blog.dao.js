const BaseDao = require('./base.dao');
const BlogModel = require('../models/blogs.model');
const dbConstants = require('../../config/dbConstants')
const blogDao = new BaseDao(BlogModel);

async function createBlog(data) {
    var blog = new BlogModel(data);
    const blogDao = new BaseDao(blog);
    const userData = await blogDao.insertOne(data);
    return userData;
}

async function getBlogs(query = {}) {
    const blogs = await blogDao.findMany(query).populate({'path': 'user_id'}).lean().exec();
    return blogs;
}

async function getBlogsByUser(query) {
    const blogs = await blogDao.findMany(query).lean().exec();
    return blogs;
}

async function getBlog(query) {
    const blogs = await blogDao.findOne(query).populate({'path': 'user_id'}).lean().exec();
    return blogs;
}

removeBlog = async (query)=>{
    return await blogDao.removeOne(query)
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    getBlogsByUser,
    removeBlog
};