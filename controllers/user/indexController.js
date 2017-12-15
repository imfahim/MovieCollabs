// DECLARATION
const express = require('express');
const router = express.Router();

// ROUTES
router.get('/', (request, response, next) => {
	if(request.session.loggedUsername == null)
	{
		request.flash('fail', 'You need to login first !', '/login');
	}
	else
	{
		next();
	}
});

router.get('/', (request, response, next) => {
	response.render('user/index', { username: request.session.loggedUsername });
});

module.exports = router;
