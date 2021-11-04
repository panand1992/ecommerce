const sqlConnection = require("../services/sqlConnection");

module.exports = {
	login: function(data, callback) {
		var sql = "SELECT * FROM Users WHERE Username = ? AND Password = ?";
		var values = [];
		values.push(data.username);
		values.push(data.password);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	}
};