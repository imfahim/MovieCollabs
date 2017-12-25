const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
  insertGetid: function(values,callback){
    var sql = "INSERT INTO movies (title,director,cast,plot,release_date) VALUES ('"+values.title+"','"+values.director+"','"+values.cast+"','"+values.plot+"','"+values.date+"')";
		database.executeGetId(sql, function(flag){
			callback(flag);
		});
  },
  getMovies: (callback) => {
    var sql = "SELECT movie_id, title FROM movies";
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

};
