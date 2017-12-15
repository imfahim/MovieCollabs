const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
	insert: function(user, callback){
		var sql = "INSERT INTO users (username, password, email) VALUES ('" + user.username + "', '" + user.password + "', '" + user.email + "')";
		//var sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
		database.execute(sql, false, function(flag){
			callback(flag);
		});
	},
	validate: function(user, callback){
		var sql = "SELECT username, password FROM users WHERE username='" + user.username + "' AND type=0";
		database.getResult(sql, function(result){
			if(result.length > 0)
			{
				var hash = result[0].password.toString();

				bcrypt.compare(user.password, hash, function(error, response) {
				    if(response === true){
							callback(true);
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
