const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
  getbyuser: function(userid,callback){
    var sql = "SELECT * FROM transactions where user_id=?";
		database.getResults(sql,[userid], function(flag){
			callback(flag);
		});
  },

  insert: function(values, callback){
		var sql = "INSERT INTO transactions (user_id,date,amount,bkash_id) VALUES ('"+values.id+"', '"+values.date+"','9.99','"+values.bkash+"')";
		database.execute(sql, function(flag){
			callback(flag);
		});
	},
  getAll: function(callback){
    var sql = "SELECT * FROM transactions";
		database.getResult(sql, function(flag){
			callback(flag);
		});
  },


};
