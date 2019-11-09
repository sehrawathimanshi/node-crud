const blogController = {};
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const blogService = require('../services/blog.service')
/**
 * @description
 * Function authControllers is a Entry point for all user
 * @param req {Object} the request object
 * */

blogController.createBlog = async (req) => {
    try {
        const blog = await blogService.createBlog(req);
        return blog;
    } catch(error) {
        throw error;
    }
}

blogController.getBlogsByUser = async (req) => {
    try {
        const blogs = await blogService.getBlogsByUser({user_id: req.params.userId});
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

blogController.getAllBlogs  = async() =>{
    try {
        const blogs = await blogService.getAllBlogs();
        return blogs;
    } catch(error) {
        throw error;
    }
}

blogController.deleteBlogById = async (req) =>{
    try {
        console.log(req.userData, req.params)
        const blog = await blogService.getBlog({user_id: req.userData._id, _id: req.params.blogId});
        console.log('blog', blog)
        if(blog){
            return await blogService.deleteBlogById({_id: req.params.blogId})
        }else{
            throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.BLOG_NOT_EXIST, 404);
        }
    } catch(error) {
        throw error;
    }
}

module.exports = blogController;