// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS
const userModel = require.main.require('./models/user');

// ROUTES
router.get('/', (request, response, next) => {
	response.render('auth/login');
});

router.post('/', (request, response) => {
	
	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(valid){
		if(valid)
		{
			request.session.loggedUsername = request.body.username;
			request.flash('success', 'Successfully Registered !', '/home');
		}
		else
		{
			request.flash('fail', 'Incorrect Credentials, Please try again !', '/login');
		}
	});
});

router.get('/logout', (request, response, next) => {
    request.session.destroy(() => {
        response.clearCookie('connect.sid')
        response.redirect('/')
    });
})﻿;

module.exports = router;
