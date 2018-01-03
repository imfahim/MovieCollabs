const database = require('../configs/database');

module.exports = {
  getMovie: function(values,callback){
    var sql="SELECT * FROM history WHERE user_id='"+values.user_id+"' and movie_id='"+values.movie_id+"'";
    database.getResult(sql, (result) => {
      callback(result[0]);
    });
  },
  newMovie: function(values,callback){
    var sql="INSERT INTO history (user_id,movie_id,time,currently_watching) VALUES ('"+values.user_id+"','"+values.movie_id+"','"+values.time+"','1')";
    database.execute(sql,function(flag){
      callback(flag);
    });
  },
  setMovie: function(values,callback){
    var sql="UPDATE history set time='"+values.time+"' , currently_watching='0',watch_date='"+values.date+"' WHERE user_id='"+values.user_id+"' and movie_id='"+values.movie_id+"'";
    database.execute(sql,function(flag){
      callback(flag);
    });
  },
  watchMovie: function(values,callback){
    var sql="UPDATE history SET currently_watching='1' , watch_date='"+values.date+"' WHERE user_id='"+values.user_id+"' and movie_id='"+values.movie_id+"'";
    database.execute(sql,function(flag){
      callback(flag);
    });
  },
  completeMovie: function(values,callback){
    var sql="UPDATE history SET completed=completed+1 , time=0 WHERE user_id='"+values.user_id+"' and movie_id='"+values.movie_id+"'";
    database.execute(sql,function(flag){
      callback(flag);
    });
  },
  myHistory:function(value,callback){
    var sql="SELECT * FROM history INNER JOIN movies ON history.movie_id=movies.movie_id WHERE history.user_id='"+value+"' ORDER BY history.watch_date DESC";
    database.getResult(sql, (result) => {
      callback(result);
    });
  },
  getCurrent:function(values,callback){
    var sql="";
    for(var i=0;i<values.length;i++){
      sql +="SELECT movies.movie_id , movies.title,history.user_id FROM movies JOIN history ON history.movie_id=movies.movie_id WHERE history.user_id='"+values[i].id+"' and history.currently_watching='1';";
    }
    database.getResult(sql, (result) => {
      callback(result);
    });
  },


};
