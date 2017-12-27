const database = require('../configs/database');

module.exports = {
  insert: function(values,callback){
    var sql = "INSERT INTO watchlist (user_id,movie_id) VALUES ('"+values.user_id+"','"+values.movie_id+"')";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  getByIds: function(values,callback){
    var sql = "SELECT * FROM watchlist where user_id = '"+values.user_id+"'";
		database.getResult(sql, function(flag){
			callback(flag);
		});
  },
  delete: function(values,callback){
    var sql = "DELETE FROM  watchlist where user_id = '"+values.user_id+"' AND movie_id='"+values.movie_id+"'";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  moviesFromMyList: (values, callback) => {
    var sql = "SELECT * FROM movies AS m JOIN watchlist AS l ON m.movie_id = l.movie_id WHERE l.user_id = '" + values.user_id + "'";
    database.getResult(sql, (result) => {
      callback(result);
    });
  },
};
