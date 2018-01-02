const database = require('../configs/database');

module.exports = {
  insert: (values, callback) => {
    var sql = "INSERT INTO party_invites (party_id, user_id) VALUES ('" + values.party_id + "','" + values.user_id + "')";
		database.execute(sql, (flag) => {
			callback(flag);
		});
  },
  getInvitesByUserId: (user_id, callback) => {
    var sql = "SELECT p.party_name, u.username, p.party_id FROM party_invites AS pi INNER JOIN users AS u ON pi.user_id = u.id INNER JOIN parties AS p ON p.party_id = pi.party_id WHERE pi.user_id = ? ORDER BY pi.id";
    database.getResults(sql, [user_id], (result) => {
      callback(result);
    });
  },
  giveAccess: (user_id, party_id, callback) => {
    var sql = "SELECT * FROM party_invites WHERE party_id = '" + party_id + "' AND user_id = '" + user_id + "'";
    database.getResult(sql, (result) => {
      callback(result);
    });
  },
  removeInvites: (party_id, callback) => {
    var sql = "DELETE FROM party_invites WHERE party_id = '" + party_id + "'";
    database.execute(sql, (flag) => {
      callback(flag);
    });
  },
};
