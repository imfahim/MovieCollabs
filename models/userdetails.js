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
      callback(result);
    });
  },
  getMovieById: (movie_id, callback) => {
    var sql = "SELECT * FROM movies WHERE movie_id = ?";
    database.getResults(sql, [movie_id], function(result){
			callback(result[0]);
		});
  },
  update: (userdetails, callback)=>{
    var sql = "UPDATE userdetails SET fav_genre=?, fav_actor=?, fav_director=? WHERE user_id=?";
    db.execute(sql, [userdetails.fav_genre, userdetails.fav_actor, userdetails.fav_director, userdetails.user_id], function(flag){
      callback(flag);
    });
  }
};
