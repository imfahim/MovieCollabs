const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
	insert: function(user, callback){
		var sql = "INSERT INTO users (username, password, email) VALUES ('" + user.username + "', '" + user.password + "', '" + user.email + "')";
		//var sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
		database.executeGetId(sql, function(flag){
			callback(flag);
		});
	},
	validate: function(user, callback){
		var sql = "SELECT id, username, password FROM users WHERE username='" + user.username + "' AND type=0";
		database.getResult(sql, function(result){
			if(result.length > 0)
			{
				var hash = result[0].password.toString();
				bcrypt.compare(user.password, hash, function(error, response) {
				    if(response === true){
							//request.session.loggedUserid = result[0].id;
							callback([true, result[0].id],result[0].type);
						}else{
							callback(false);
						}
				});
			}
			else
			{
				callback(false);
			}
		});
	},
	getUser: function(user, callback){
		var sql = "SELECT * FROM users WHERE username='" + user.username + "' AND password='" + user.password + "'";
		database.getResult(sql, function(result){
			if(result.length > 0)
			{
				callback(result);
			}
			else
			{
				callback(result);
			}
		});
	}
};
