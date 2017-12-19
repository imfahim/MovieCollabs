// DECLARATION
const express = require('express');
const router = express.Router();

// ROUTES
router.get('/', (request, response, next) => {
	if(request.session.loggedUsername == null)
	{
		request.flash('fail', 'You need to login first !', '/');
	}
	else
	{
		next();
	}
});

router.get('/', (request, response, next) => {
	response.render('user/index', { id: request.session.loggedId, username: request.session.loggedUsername });
});

module.exports = router;
