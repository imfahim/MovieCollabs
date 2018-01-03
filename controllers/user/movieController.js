// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();
const fs = require('fs');

// MODELS
const moviesModel = require.main.require('./models/movies');
const SubscribeModel = require.main.require('./models/subscriber');
const my_listModel = require.main.require('./models/my_list');
const watch_listModel = require.main.require('./models/watchlist');
const reviewModel = require.main.require('./models/review');
const likeModel = require.main.require('./models/like');
const historyModel = require.main.require('./models/history');


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
router.post('/delete',(request,response,next)=>{
	var movie_id=request.body.movie_id;
	fs.unlink('./public/poster/'+movie_id+'.jpg',function(error){
		if(error){
			request.flash('fail',error,'/admin/charts');
		}
		else{
			fs.unlink('./public/movies/'+movie_id+'.mp4',function(error){
				if(error){
					request.flash('fail',error,'/admin/charts');
				}
				else{
					moviesModel.delete(movie_id,(flag)=>{
						if(flag){
							request.flash('success','Succesfully Deleted','/admin/charts');
						}
						else{
							request.flash('fail','DB Error','/admin/charts');
						}
					});
				}
			});
		}
	});

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
				reviewModel.getReviewsByMovie(movie_id, (reviews_result) => {
					likeModel.getAll(movie_id,(likes)=>{
						var lk='null';
						var totallike=0;
						var totaldislike=0;
						for(var i=0;i<likes.length;i++){
							if(likes[i].user_id==request.session.loggedId && likes[i].status=="like"){
								lk='liked';
							}
							if(likes[i].user_id==request.session.loggedId && likes[i].status=="dislike"){
								lk='disliked';
							}
							if(likes[i].status=="like"){
								totallike++;
							}
							else if(likes[i].status=="dislike"){
								totaldislike++;
							}
						}
						response.render('user/movies/movie', { movie: result,date:ex ,my_list:check, watchlist:watchlist_check, reviews: reviews_result,like:lk,totallike:totallike,totaldislike:totaldislike,moment:moment });
					});
				});
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
router.post('/play/getmovie',(req,res)=>{
	var data={
		movie_id:req.body.movie_id,
		user_id:req.body.user_id
	};
	historyModel.getMovie(data,(result)=>{
		if(result==null){
			res.send(null);
		}
		else{
			res.send(JSON.stringify(result, null, 3));
		}
	});
});
router.post('/play/newmovie',(req,res)=>{
	var data={
		movie_id:req.body.movie_id,
		user_id:req.body.user_id,
		time:req.body.time
	};
	historyModel.newMovie(data,(result)=>{
		res.send(result);
	});
});
router.post('/play/watchmovie',(req,res)=>{
	var data={
		movie_id:req.body.movie_id,
		user_id:req.body.user_id,
		date:moment().format("YYYY-MM-DD hh:mm:ss"),
	};
	historyModel.watchMovie(data,(result)=>{
		res.send(result);
	});
});
router.post('/play/setmovie',(req,res)=>{
	var data={
		movie_id:req.body.movie_id,
		user_id:req.body.user_id,
		time:req.body.time,
		date:moment().format("YYYY-MM-DD hh:mm:ss"),
	};
	historyModel.setMovie(data,(result)=>{
		res.send(result);
	});
});
router.post('/play/complete',(req,res)=>{
	var data={
		movie_id:req.body.movie_id,
		user_id:req.body.user_id,
	};
	historyModel.completeMovie(data,(result)=>{
		res.send(result);
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

// Review
router.post('/review/add', (request, response, next) => {
	var data = {
		user_id: request.session.loggedId,
		movie_id: request.body.movie_id,
		text_review: request.body.text_review
	};
	reviewModel.insert(data, (flag) => {
		if(flag){
			request.flash('Success', 'Review Added !', '/movie/' + data.movie_id);
		}else{
			request.flash('fail', 'DB Error !', '/movie/' + data.movie_id);
		}
	});
});
router.get('/like/add/:id',(request,response,next) =>{
	var movie_id = request.params.id;
	var data={
		user_id:request.session.loggedId,
		movie_id:movie_id,
		status:'like'
	};
	likeModel.check(data,(result)=>{
		if(result){
			likeModel.update(data,(flag)=>{
				if(flag){
					request.flash('Success', 'Liked !', '/movie/' + movie_id);
				}
			});
		}
		else{
			likeModel.insertStatus(data, (like_flag) => {
				if(like_flag){
					request.flash('Success', 'Liked !', '/movie/' + movie_id);
				}
			});
		}
	});
});

router.get('/dislike/add/:id',(request,response,next) =>{
	var movie_id = request.params.id;
	var data={
		user_id:request.session.loggedId,
		movie_id:movie_id,
		status:'dislike'
	};
	likeModel.check(data,(result)=>{
		if(result){
			likeModel.update(data,(flag)=>{
				if(flag){
					request.flash('Success', 'DisLiked !', '/movie/' + movie_id);
				}
			});
		}
		else{
			likeModel.insertStatus(data, (like_flag) => {
				if(like_flag){
					request.flash('Success', 'DisLiked !', '/movie/' + movie_id);
				}
			});
		}
	});
});


module.exports = router;
