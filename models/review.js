const database = require('../configs/database');

module.exports = {
  insert: function(values,callback){
    var sql = "INSERT INTO reviews (user_id, movie_id, text_review) VALUES ('" + values.user_id + "', '" + values.movie_id + "', '" + values.text_review + "')";
		database.execute(sql, function(flag){
			callback(flag);
		});
  },
  getReviewsByMovie: (movie_id, callback) => {
    var sql = "SELECT * FROM reviews AS rv JOIN users AS u ON rv.user_id = u.id WHERE rv.movie_id = '" + movie_id + "'";
    database.getResult(sql, (result) => {
      callback(result);
    });
  }

};
