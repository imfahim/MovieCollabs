const database = require('../configs/database');

module.exports = {
  insert: function(movie_id, callback){
    var sql = "INSERT INTO likes (movie_id) VALUES ('" + movie_id + "')";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  addLike: (movie_id, callback) => {
    var sql = "UPDATE likes SET likes = likes + 1 WHERE movie_id = '" + movie_id + "'";
    database.execute(sql, (flag) => {
      callback(flag);
    });
  },
  addDislike: (movie_id, callback) => {
    var sql = "UPDATE likes SET dislikes = dislikes + 1 WHERE movie_id = '" + movie_id + "'";
    database.execute(sql, (flag) => {
      callback(flag);
    });
  }

};
