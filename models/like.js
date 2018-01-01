const database = require('../configs/database');

module.exports = {
  insert: function(movie_id, callback){
    var sql = "INSERT INTO likes (movie_id) VALUES ('" + movie_id + "')";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  insertStatus: (values, callback) => {
    var sql = "INSERT INTO likes (movie_id,user_id,status) VALUES ('"+values.movie_id+"','"+values.user_id+"','"+values.status+"')";
    database.execute(sql, (flag) => {
      if(flag){
        var sql1="SELECT * FROM likes WHERE movie_id='"+values.movie_id+"'";
        database.getResult(sql1,(flag1)=>{
            var sql2="SELECT * FROM likes WHERE movie_id='"+values.movie_id+"' AND status='like'";
            database.getResult(sql2,(flag2)=>{
              var rating=(flag2.length/flag1.length)*5;
              var sqlRat ="UPDATE movies SET rating='"+rating+"' WHERE movie_id='"+values.movie_id+"'";
              database.execute(sqlRat,(finalFlag)=>{
                callback(finalFlag);
              });
            });
        });
      }
      else{
        callback(flag);
      }
    });
  },
  getAll:(value,callback) =>{
    var sql = "SELECT * FROM likes WHERE movie_id = '"+value+"'";
    database.getResult(sql, (flag) => {
      callback(flag);
    });
  },
  check: function(values, callback){
		var sql = "SELECT * FROM likes WHERE user_id='" + values.user_id +"' AND movie_id='"+values.movie_id+"'";
		database.getResult(sql, function(result){
      if(result.length > 0)
			{
        callback(true);
      }
      else{
        callback(false);
      }
    });
  },

  update: function(values,callback){
    var sql="UPDATE likes SET status='"+values.status+"' WHERE user_id='" + values.user_id +"' AND movie_id='"+values.movie_id+"'";
    database.execute(sql,function(result){
      if(result){
        var sql1="SELECT * FROM likes WHERE movie_id='"+values.movie_id+"'";
        database.getResult(sql1,(flag1)=>{
            var sql2="SELECT * FROM likes WHERE movie_id='"+values.movie_id+"' AND status='like'";
            database.getResult(sql2,(flag2)=>{
              console.log((flag2.length/flag1.length)*5);
              var rating=(flag2.length/flag1.length)*5;
              console.log(rating);
              var sqlRat ="UPDATE movies SET rating='"+rating+"' WHERE movie_id='"+values.movie_id+"'";
              database.execute(sqlRat,(finalFlag)=>{
                callback(finalFlag);
              });
            });
        });
      }
      else{
        callback(flag);
      }
    });
  }

};
