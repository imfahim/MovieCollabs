// DECLARATION
const express = require('express');
const moment = require('moment');
const router = express.Router();

const my_listModel = require.main.require('./models/my_list');
const watch_listModel = require.main.require('./models/watchlist');
const userModel = require.main.require('./models/user');
const buddyModel = require.main.require('./models/buddy_lists');
const historyModel = require.main.require('./models/history');
const userdetailsModel = require.main.require('./models/userdetails');




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
				buddyModel.requests(request.session.loggedId,(reqsts)=>{
					historyModel.myHistory(request.session.loggedId,(histories)=>{
						userdetailsModel.getUserDetailsById(request.session.loggedId, (profile_result) => {
							console.log(profile_result);
							response.render('user/profile', { mylist: mylist_result , watchlist: watchlist_result,reqsts:reqsts,history:histories,moment:moment, userdetails: profile_result});
});
});
});
});
});
});

router.post('/', function(request, response){
	var details = {
		fav_genre: request.body.f_genre,
		fav_actor: request.body.f_actor,
		fav_director: request.body.f_director
	};

	userdetails.update(details, function(success){
		if(success)
		{
			response.redirect('/');
		}
		else
		{
			response.send('Error inserting data');
		}
	});

});


router.get('/profileOf/:id', (request, response, next) => {
	var user_id=request.params.id;
	if(user_id==request.session.loggedId){
		response.redirect('/profile')
	}
	else{
				userModel.infoByid(user_id,(result)=>{
					if(result){
					var data={
						myid:request.session.loggedId,
						user_id:user_id,
					};
					buddyModel.getBuddy(data,(result1)=>{
						var status=null;
						var buddyid=null
						if(result1){
							if(result1.user_id1==request.session.loggedId && result1.status=='requested'){
								status="sent";
							}
							else if(result1.user_id2==request.session.loggedId && result1.status=='requested'){
								status="confirm";
							}
							if(result1.status=='accepted'){
								status='buddy';
							}
							buddyid=result1.buddy_id;
						}

						response.render('user/profileOf', { user_id: user_id,info:result,status:status,buddyid:buddyid});
					});
				}
				else{
					request.flash('fail', 'No Such User !', '/home');
				}
				});
			}

});


module.exports = router;
