// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS


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
  //console.log(request.app.get('chat'));
	response.render('user/chatting/party/chat');
});

module.exports = router;
