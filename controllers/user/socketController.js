
// MODELS
const partyModel = require.main.require('./models/party');
const buddyModel = require.main.require('./models/buddy_lists');
const partyInvitesModel = require.main.require('./models/party_invites');

// usernames which are currently connected to the chat
var usernames = {};

// ROUTES
module.exports.respond = (io, socket) => {

		socket.on('join', (data) => {
			socket.username = data.username;
			socket.room = data.room;
			usernames[socket.username] = socket.username;

			// joining
			socket.join(socket.room);


			io.sockets.emit('updateclientlist', usernames);
		});

		socket.on('notify', (data) => {
			socket.emit('updatechat', 'Party', 'you have connected to ' + 'Party ID : ' + socket.room + ' | ' + 'Party Name : ' + data.party_name + ' | ' + 'Party Leader : ' + data.party_leader);
			socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has connected to this party');
		});

		// // when the client emits 'adduser', this listens and executes
		// socket.on('adduser', function(data){
		// 	console.log(data.room);
		// 	// store the username in the socket session for this client
		// 	socket.username = data.username;
		// 	// store the room name in the socket session for this client
		// 	socket.room = data.room;
		// 	// add the client's username to the global list
		// 	usernames[username] = data.username;
		// 	// send client to room 1
		// 	socket.join(data.room);
		// 	// echo to client they've connected
		// 	socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// 	// echo to room 1 that a person has connected to their room
		// 	socket.broadcast.to(data.room).emit('updatechat', 'SERVER', data.username + ' has connected to this room');
		// 	//socket.emit('updaterooms', rooms, data.room);
		// });

		// when the client emits 'sendchat', this listens and executes
		socket.on('sendchat', function (data) {
			// we tell the client to execute 'updatechat' with 2 parameters
			io.sockets.in(socket.room).emit('updatechat', socket.username, data);
		});

		// socket.on('switchRoom', function(newroom){
		// 	// leave the current room (stored in session)
		// 	socket.leave(socket.room);
		// 	// join new room, received as function parameter
		// 	socket.join(newroom);
		// 	socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// 	// sent message to OLD room
		// 	socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// 	// update socket session room title
		// 	socket.room = newroom;
		// 	socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		// 	socket.emit('updaterooms', rooms, newroom);
		// });

		// when the user disconnects.. perform this
		socket.on('leave', () => {
			// remove the username from global usernames list
			delete usernames[socket.username];
			// update list of users in chat, client-side
			io.sockets.emit('updateclientlist', usernames);
			// echo globally that this client has left
			socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has left');
			socket.leave(socket.room);
		});




		// Others
		// ------------------------------------------------------------------------------------------------------------------------------------

		// Friendlist / PartyList
		socket.on('updateFriendList', (logged_user) => {
			buddyModel.getBuddys(logged_user, (result) => {
				if(result){
					io.sockets.emit('updateFriends', result);
				}else{
					io.sockets.emit('updateFriends', '');
				}
			});
		});

		socket.on('updatePartyList', (leader_id) => {
			partyModel.getPartiesByLeaderId(leader_id, (result) => {
				if(result){
					io.sockets.emit('updateParties', result);
					//io.sockets.emit('createPartiesSelectBox', result);
				}else{
					io.sockets.emit('updateParties', '');
					//io.sockets.emit('createPartiesSelectBox', '');
				}
			});
		});

		socket.on('createPartiesSelections', (leader_id) => {
			partyModel.getPartiesByLeaderId(leader_id, (result) => {
				if(result){
					io.sockets.emit('createPartiesSelectBox', result);
				}else{
					io.sockets.emit('createPartiesSelectBox', '');
				}
			});
		});

		// Notifications
		socket.on('updateNotifications', (user_id) => {
			partyInvitesModel.getInvitesByUserId(user_id, (result) => {
				if(result){
					io.sockets.emit('updateUserNotifications', result);
				}else{
					io.sockets.emit('updateUserNotifications', '');
				}
			});
		});


		// Video Streaming
		
};
























/*
router.all('*', (request, response, next, io) => {
	// middleware
		next();
});



router.get('/test', (request, response, next) => {
		console.log('ok');
});

router.get('/create', (request, response, next) => {

	// Generate unique id for the room
	var partyid = Math.round((Math.random() * 1000000));

	var namespace = io.of('/party');

	namespace.on('connection', (socket) => {
		socket.join(partyid);
		console.log("Created & Joined");
	});

	// Redirect to the random room
	response.redirect('/chat/party/'+partyid);
});

router.get('/party/:id', (request, response, next) => {
	var id=request.params.id;

	io.nsps['/party'].on('connection',(socket)=>{
		socket.on('join', (partyid) => {
			socket.leave(partyid);
			socket.join(partyid);
			console.log(io.nsps['/party'].adapter.rooms[partyid]);
		});
	});





	// Render the chant.html view
	response.render('user/chatting/party/chat');
});

router.post('/send', (request, response, next) => {

});



*/
