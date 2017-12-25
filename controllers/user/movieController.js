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

router.get('/:id', (request, response, next) => {
  var movie_id = request.params.id;
  moviesModel.getMovieById(movie_id, (result) => {
    response.render('user/movies/movie', { movie: result });
  });
});

router.get('/play/:id', (request, response, next) => {
  var movie_id = request.params.id;
  // Checking then redirect to the Play Page
  response.render('user/movies/play', { movie_id: movie_id });
});

module.exports = router;
