const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const validateUser = require('../helpers/middleware');


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

router.get('/:userId', async  (req, res, next)=> {
    try{
        const blogs =  await blogController.getBlogsByUser(req);
        res.status(200).json({data: {
            blogs: blogs,
            count: blogs.length
        }});
    } catch(error) {
        next(error);
    }
})

router.get('/', async  (req, res, next)=> {
    try{
        const blogs =  await blogController.getAllBlogs();
        res.status(200).json({data: {
            blogs: blogs,
            count: blogs.length
        }});
    } catch(error) {
        next(error);
    }
})

router.delete('/:blogId', validateUser.authenticate, async  (req, res, next)=> {
    try{
        const blog =  await blogController.deleteBlogById(req);
        res.status(200).json(blog);
    } catch(error) {
        next(error);
    }
})



module.exports = router;