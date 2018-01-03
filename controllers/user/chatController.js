// DECLARATION
const express = require('express');
const router = express.Router();

// MODELS
const partyModel = require.main.require('./models/party');
const userModel = require.main.require('./models/user');
const partyInvitesModel = require.main.require('./models/party_invites');

// CONTROLLERS


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

router.post('/create', (request, response, next) => {
	partyModel.insertGetid({ party_id: request.body.party_id, user_id: request.session.loggedId, party_name: request.body.party_name,movie_id:request.body.movie_id }, (id) => {
		if(id){
			partyModel.getPartyById(id, (result) => {
				response.redirect('/chat/join/' + result.party_id);
			});
		}
	});
});

router.get('/join/:id', (request, response, next) => {
	partyModel.getPartyByUniqueId(request.params.id, (result) => {
		if(result){
			if(result.leader_id != request.session.loggedId){
				console.log('leader na tai if e dhukse');
				partyInvitesModel.giveAccess(request.session.loggedId, request.params.id, (access_result) => {
					console.log(access_result);
					if(access_result.length > 0){
						userModel.infoByid(result.leader_id, (sub_result) => {
							if(sub_result){
								response.render('user/chatting/party/chat', { partyid: result.party_id, partyname: result.party_name, partyleader_username: sub_result.username, partyleader_id: result.leader_id,movie_id:result.movie_id, });
							}else{
								request.flash('fail', 'Error Occured !', '/home');
							}
						});
					}else{
						request.flash('fail', 'There is no such party / You do not have access to that party !', '/home');
					}
				});
			}else{
				console.log('leader bole tai else e dhukse');
				userModel.infoByid(result.leader_id, (sub_result) => {
					if(sub_result){
						response.render('user/chatting/party/chat', { partyid: result.party_id, partyname: result.party_name, partyleader_username: sub_result.username, partyleader_id: result.leader_id,movie_id:result.movie_id, });
					}else{
						request.flash('fail', 'Error Occured !', '/home');
					}
				});
			}
		}else{
			request.flash('fail', 'There is no such party !', '/home');
		}
	});
});

router.get('/leave/:id', (request, response, next) => {
	var party_id = request.params.id;
	var user_id = request.session.loggedId;

	partyModel.getPartyByUniqueId(party_id, (result) => {
		if(result){
			if(user_id === result.leader_id){
				partyModel.removePartyByUniqueId(result.party_id, (flag) => {
					if(flag){
						partyInvitesModel.removeInvites(result.party_id, (flag) => {
							if(flag){
								request.flash('success', 'The Party is successfully left !', '/home');
							}else{
								request.flash('fail', 'Server Error !', '/home');
							}
						});
					}else{
						request.flash('fail', 'Server Error !', '/home');
					}
				});
			}else{
				request.flash('success', 'The Party is successfully left !', '/home');
			}
		}else{
			request.flash('fail', 'There is no such party !', '/home');
		}
	});

});

module.exports = router;
