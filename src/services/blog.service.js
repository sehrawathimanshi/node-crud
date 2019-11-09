const blogDao = require('../dao/blog.dao');
const dbConstants = require('../../config/dbConstants')

async function createBlog(req) {
    console.log(req.body)
    let blogData =  {
        ...req.body,
        user_id: req.userData._id,
        status: dbConstants.BLOG_STATUSES['PENDING_APPROVAL']
    }
    let savedBlog = await blogDao.createBlog(blogData);
    return savedBlog;
}

async function getBlogsByUser(query) {
    let savedBlog = await blogDao.getBlogsByUser(query);
    return savedBlog;
}

async function getBlog(query) {
    let savedBlog = await blogDao.getBlog(query);
    return savedBlog;
}

async function getAllBlogs() {
    let savedBlog = await blogDao.getBlogs();
    return savedBlog;
}

deleteBlogById = async (query)=>{
    return await blogDao.removeBlog(query)
}

module.exports = {
    createBlog,
    getBlogsByUser,
    getBlog,
    getAllBlogs,
    deleteBlogById
};