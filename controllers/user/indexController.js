// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS
const moviesModel = require.main.require('./models/movies');

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
	moviesModel.getMovies((result) => {
		response.render('user/index', { movies : result });
	});

});

router.get('/api/movies/list', (request, response, next) => {
	moviesModel.getMovies((result) => {
		//response.render('user/index', { movies : result });
		response.writeHead(200, {'content-type':'application/json'});
		response.end(JSON.stringify(result, null, 3));
	});

});

module.exports = router;
