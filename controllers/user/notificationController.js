// DECLARATION
const express = require('express');
const router = express.Router();

const buddyModel = require.main.require('./models/buddy_lists');
const partyInvitesModel = require.main.require('./models/party_invites');

// ROUTES
router.all('*', (request, response, next) => {
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
  response.render('user/notifications');
});

module.exports = router;
