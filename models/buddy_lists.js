const database = require('../configs/database');

module.exports = {
  insert: function(values,callback){
    var sql= "INSERT INTO buddy_list (user_id1,user_id2) VALUES ('"+values.myid+"','"+values.user_id+"')";
    database.execute(sql, function(flag){
			callback(flag);
		});
  },

  getBuddy:function(values,callback){
    var sql= "SELECT * FROM buddy_list WHERE user_id1='"+values.myid+"' AND user_id2='"+values.user_id+"' OR user_id2='"+values.myid+"' AND user_id1='"+values.user_id+"'";
    database.getResult(sql,function(result){
      callback(result[0]);
    });

  },
  cancel:function(value,callback){
    var sql="DELETE FROM buddy_list WHERE buddy_id='"+value+"'";
    database.execute(sql, function(flag){
			callback(flag);
		});
  },
  accpt:function(value,callback){
    var sql="UPDATE buddy_list SET status='accepted' WHERE buddy_id='"+value+"'";
    database.execute(sql, function(flag){
			callback(flag);
		});
  },
  requests:function(values,callback){
    var sql= "SELECT * FROM buddy_list INNER JOIN users ON buddy_list.user_id1=users.id WHERE buddy_list.user_id2='"+values+"' and buddy_list.status='requested'";
    database.getResult(sql,function(result){
      callback(result);
    });

  },



};
