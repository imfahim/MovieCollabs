const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
  getbyuser: function(userid,callback){
    var sql = "SELECT * FROM subscribers where user_id=?";
		database.getResults(sql,[userid], function(flag){
			callback(flag[0]);
		});
  },
  subscribe: function(subs,callback){
    var sql = "UPDATE subscribers SET status = 'paid' , expire_date ='"+subs.expire+"' where user_id='"+subs.id+"'";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  insert: function(values,callback){
    var sql = "INSERT INTO subscribers (user_id,start_date) VALUES ('"+values.id+"','"+values.start+"')";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  changeSubs: function(values,callback){
		var sql="UPDATE subscribers SET status='"+values.type+"' where user_id='"+values.user_id+"'";
		database.execute(sql,function(flag){
			callback(flag);
		});
	},

};
