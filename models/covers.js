const database = require('../configs/database');

module.exports = {
  insert: function (movie_id,callback){
    var sql= "INSERT INTO covers (movie_id) VALUES ('"+movie_id+"')"
    database.execute(sql, function(flag){
			callback(flag);
		});
  },

  getAll: function(callback){
    var sql ="SELECT * FROM covers INNER JOIN movies ON covers.movie_id = movies.movie_id";
    database.getResult(sql, (result) => {
      callback(result);
    });
  },
  remove :function(movie_id,callback){
    var sql="DELETE FROM covers WHERE movie_id='"+movie_id+"'";
    database.execute(sql,function(flag){
      callback(flag);
    });

  },


};
