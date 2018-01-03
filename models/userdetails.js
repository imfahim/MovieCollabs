const database = require('../configs/database');

module.exports = {
  insert: function(user_id, callback){
    var sql = "INSERT INTO userdetails (user_id) VALUES ('"+user_id+"')";
		database.executeGetId(sql, function(flag){
			callback(flag);
		});
  },
  getUserDetailsById: (user_id, callback) => {
    var sql = "SELECT * FROM userdetails AS ud JOIN users AS u ON ud.user_id = u.id WHERE ud.user_id = '" + user_id + "'";
    database.getResult(sql, (result) => {
      callback(result[0]);
    });
  },
  getMovieById: (movie_id, callback) => {
    var sql = "SELECT * FROM movies WHERE movie_id = ?";
    database.getResults(sql, [movie_id], function(result){
			callback(result[0]);
		});
  },
  update: (userdetails, callback)=>{
    var sql = "UPDATE userdetails SET fav_genre='"+userdetails.genre+"', fav_actor='"+userdetails.actor+"', fav_director='"+userdetails.director+"' WHERE user_id='"+userdetails.user_id+"'";
    database.execute(sql, function(flag){
      callback(flag);
    });
  }
};
