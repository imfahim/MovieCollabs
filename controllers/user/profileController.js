// DECLARATION
const express = require('express');
const router = express.Router();

const my_listModel = require.main.require('./models/my_list');
const watch_listModel = require.main.require('./models/watchlist');


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
    my_listModel.moviesFromMyList({ user_id:request.session.loggedId }, (mylist_result) => {
			watch_listModel.moviesFromMyList({ user_id:request.session.loggedId }, (watchlist_result) => {
				response.render('user/profile', { mylist: mylist_result , watchlist: watchlist_result});
			});
    });
});


module.exports = router;
