// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();

// MODELS
const moviesModel = require.main.require('./models/movies');
const SubscribeModel = require.main.require('./models/subscriber');
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

router.get('/:id', (request, response, next) => {
  var movie_id = request.params.id;
  moviesModel.getMovieById(movie_id, (result) => {
		var ex=moment(result.release_date).format("Do MMMM, YYYY");
		var data={
			user_id:request.session.loggedId,
			movie_id:movie_id
		};
		var check=false;
		my_listModel.getByIds(data,(flag)=>{

			for(var i=0;i<flag.length;i++){
				if(flag[i].movie_id==movie_id){
					check=true;
				}
			}
			watch_listModel.getByIds(data,(flag)=>{
				var watchlist_check=false;
				for(var i=0;i<flag.length;i++){
					if(flag[i].movie_id==movie_id){
						watchlist_check=true;
					}
				}
				response.render('user/movies/movie', { movie: result,date:ex ,my_list:check, watchlist:watchlist_check});
			});

		});

  });
});

router.get('/play/:id', (request, response, next) => {
  var movie_id = request.params.id;
  // Checking then redirect to the Play Page
	SubscribeModel.getbyuser(request.session.loggedId,(result)=>{
		if(result.status!='on'){
			var data={
				user_id:request.session.loggedId,
				movie_id:movie_id
			};
			my_listModel.getByIds(data,(flag)=>{
				var check=false;
				for(var i=0;i<flag.length;i++){
					if(flag[i].movie_id==movie_id){
						check=true;
					}
				}
				if(check){
					response.render('user/movies/play', { movie_id: movie_id });
				}
				else{
					request.flash('fail', 'Need Subscription!', '/movie/'+movie_id);
				}
				});
		}
		else{
			response.render('user/movies/play', { movie_id: movie_id });
		}
	});

});

router.get('/my_list/add/:id', (request, response, next) => {
  var movie_id = request.params.id;
	var data={
		user_id:request.session.loggedId,
		movie_id:movie_id
	};
	my_listModel.getByIds(data,(flag)=>{
		var check=false;
		for(var i=0;i<flag.length;i++){
			if(flag[i].movie_id==movie_id){
				check=true;
			}
		}
		if(check){
			request.flash('fail', 'Already Listed!', '/movie/'+movie_id);
		}
		else if(flag.length==10){
			request.flash('fail', 'My List is already FULL!', '/movie/'+movie_id)
		}
		else{
			my_listModel.insert(data, (result) => {
				if(result){
		    request.flash('Success', 'Added to My List!', '/movie/'+movie_id);
				}
				else{
					request.flash('fail', 'DB Error!', '/movie/'+movie_id);
				}
		  });
		}
	});
});
router.get('/my_list/remove/:id', (request, response, next) => {
		var movie_id = request.params.id;
		var data={
			user_id:request.session.loggedId,
			movie_id:movie_id
		};
		my_listModel.delete(data,(result)=>{
			if(result){
				request.flash('Success', 'Removed from My List!', '/movie/'+movie_id);
			}
			else{
				request.flash('fail', 'DB Error!', '/movie/'+movie_id);
			}
		})
});

// Watchlist
router.get('/watchlist/add/:id', (request, response, next) => {
  var movie_id = request.params.id;
	var data={
		user_id:request.session.loggedId,
		movie_id:movie_id
	};
	watch_listModel.getByIds(data,(flag)=>{
		var check=false;
		for(var i=0;i<flag.length;i++){
			if(flag[i].movie_id==movie_id){
				check=true;
			}
		}
		if(check){
			request.flash('fail', 'Already Listed!', '/movie/'+movie_id);
		}
		else{
			watch_listModel.insert(data, (result) => {
				if(result){
		    	request.flash('Success', 'Added to Watch List!', '/movie/'+movie_id);
				}
				else{
					request.flash('fail', 'DB Error!', '/movie/'+movie_id);
				}
		  });
		}
	});
});
router.get('/watchlist/remove/:id', (request, response, next) => {
		var movie_id = request.params.id;
		var data={
			user_id:request.session.loggedId,
			movie_id:movie_id
		};
		watch_listModel.delete(data,(result)=>{
			if(result){
				request.flash('Success', 'Removed from Watch List!', '/movie/'+movie_id);
			}
			else{
				request.flash('fail', 'DB Error!', '/movie/'+movie_id);
			}
		})
});
module.exports = router;
