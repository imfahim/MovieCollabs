// DECLARATION
const express = require('express');
const router = express.Router();

const my_listModel = require.main.require('./models/my_list');


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
    my_listModel.moviesFromMyList({ user_id:request.session.loggedId }, (result) => {
      response.render('user/profile', { list: result });
    });
});


module.exports = router;
