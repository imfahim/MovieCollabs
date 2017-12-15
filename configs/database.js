const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

module.exports = {
	getResult: function(sql, callback){
		connection.query(sql, function (error, result) {
			if(error)
			{
				console.log(error.stack);
				callback([]);
			}
			else
			{
				callback(result);
			}

			connection.end(function(err) {
			  // The connection is terminated now
			});
		});
	},

	execute: function(sql, data, callback){
		if(data === false){
      connection.query(sql, function (error, result) {
  			if(error)
  			{
  				console.log(error.stack);
  				callback(false);
  			}
  			else
  			{
  				callback(true);
  			}

  			connection.end(function(err) {
  			  // The connection is terminated now
  			});
  		});
    }else{
      connection.query(sql, data, function (error, result) {
  			if(error)
  			{
  				console.log(error.stack);
  				callback(false);
  			}
  			else
  			{
  				callback(true);
  			}

  			connection.end(function(err) {
  			  // The connection is terminated now
  			});
  		});
    }
	}
};
