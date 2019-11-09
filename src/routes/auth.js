const express = require("express");
const router = express.Router();
const config = require('../../config/config');
var authControllers = require('../controllers/authController');

router.post('/login', async  (req, res, next)=> {
	try{
		const userData =  await authControllers.authUser(req.body);
		res.status(200).json({data: userData});
	} catch(error) {
		next(error);
	}
})



module.exports = router;