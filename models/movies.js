const database = require('../configs/database');

var bcrypt = require('bcrypt');

module.exports = {
  insertGetid: function(values,callback){
    var sql = "INSERT INTO movies (title,director,cast,plot,release_date) VALUES ('"+values.title+"','"+values.director+"','"+values.cast+"','"+values.plot+"','"+values.date+"')";
		database.executeGetId(sql, function(flag){
			callback(flag);
		});
  },

};
