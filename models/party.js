const database = require('../configs/database');

module.exports = {
  insertGetid: function(values, callback){
    var sql = "INSERT INTO parties (party_id, leader_id, party_name,movie_id) VALUES ('" + values.party_id + "','" + values.user_id + "','" + values.party_name +"','"+values.movie_id+"')";
		database.executeGetId(sql, function(flag){
			callback(flag);
		});
  },
  getPartyById: (id, callback) => {
    var sql = "SELECT * FROM parties WHERE id = ?";
    database.getResults(sql, [id], function(result){
			callback(result[0]);
		});
  },
  getPartyByUniqueId: (party_id, callback) => {
    var sql = "SELECT * FROM parties WHERE party_id = ?";
    database.getResults(sql, [party_id], function(result){
			callback(result[0]);
		});
  },
  removePartyByUniqueId: (party_id, callback) => {
    var sql = "DELETE FROM parties WHERE party_id = '" + party_id + "'";
    database.execute(sql, (flag) => {
      callback(flag);
    });
  },
  getPartiesByLeaderId: (leader_id, callback) => {
    var sql = "SELECT * FROM parties WHERE leader_id = ?";
    database.getResults(sql, [leader_id], (result) => {
      callback(result);
    });
  },

};
