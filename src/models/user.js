const sqlConnection = require("../services/sqlConnection");
const {
	userType
} = require("../constants/backendConfig");

module.exports = {
	login: function(data, callback) {
		var sql = "SELECT ID as UserId, Username, UserType FROM Users WHERE Username = ? AND Password = ?";
		var values = [];
		values.push(data.username);
		values.push(data.password);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	},

	signup: function(data, callback) {
		var sql = "INSERT INTO Users (Username, Password, UserType, CreatedAt, UpdatedAt) VALUES (?, ?, ?, now(), now())";
		var values = [];
		values.push(data.username);
		values.push(data.password);
		values.push(userType[data.userType]);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	}
};