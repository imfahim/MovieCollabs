// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();

const movieModel = require.main.require('./models/movies');


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

router.get('/',(req,res,next)=>{
  movieModel.getMovies((result)=>{
    res.render('user/movies/browse',{movies:result,moment:moment});
  });
});

module.exports = router;
