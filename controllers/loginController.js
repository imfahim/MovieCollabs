// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS
const userModel = require.main.require('./models/user');

// ROUTES
/*
router.get('/', (request, response, next) => {
	response.render('auth/login');
});
*/
router.post('/', (request, response) => {

	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(valid){
		if(valid != false)
		{
			request.session.loggedUsername = request.body.username;
			request.session.loggedId = valid[1];
			request.session.type=valid[2];

			userModel.setUserStatusOn(request.session.loggedId, (flag) => {
				if(flag){
					request.flash('success', 'Successfully Logged In !', '/home');
				}else{
					request.flash('fail', 'Error Occured !', '/');
				}
			});
		}
		else
		{
			request.flash('fail', 'Incorrect Credentials, Please try again !', '/');
		}
	});
});

router.get('/logout', (request, response, next) => {
		userModel.setUserStatusOff(request.session.loggedId, (flag) => {
			if(flag){
				request.session.destroy(() => {
		        response.clearCookie('connect.sid')
		        response.redirect('/')
		    });
			}else{
				request.flash('fail', 'Error Occured !', '/');
			}
		});
});﻿

module.exports = router;
