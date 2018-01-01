// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();

// MODELS
const moviesModel = require.main.require('./models/movies');
const coversModel = require.main.require('./models/covers');
const SubscribeModel = require.main.require('./models/subscriber');
const buddyModel = require.main.require('./models/buddy_lists');



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
		moviesModel.getTopchart((charts)=>{
			coversModel.getAll((covers)=>{
				SubscribeModel.getbyuser(request.session.loggedId,(flag)=>{
					if(flag.status=="on"){
						request.session.subscribe="on";
					}
					else{
						request.session.subscribe=null;
					}
						response.render('user/index', { movies : result ,top_chart:charts,covers:covers,moment:moment});
				});

			});
		});

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
