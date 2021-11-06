const sqlConnection = require("../services/sqlConnection");

module.exports = {
	listProducts: function(data, callback) {
		var sql = "SELECT ID AS productId, Name AS name, Price AS price FROM Products WHERE CategoryId = ?";
		var values = [];
        values.push(data.categoryId);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	},

	addProduct: function(data, callback) {
		var sql = "INSERT INTO Products (Name, Price, Description, CategoryID, VendorID, CreatedAt, UpdatedAt) "
			+ "VALUES (?, ?, ?, ?, ?, now(), now())";
		var values = [];
		values.push(data.name);
		values.push(data.price);
		values.push(data.description);
		values.push(data.categoryId);
		values.push(data.vendorId);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	},

	getProductDetails: function(data, callback) {
		var sql = "SELECT Name AS name, Price AS price, Description AS description  FROM Products WHERE ID = ? LIMIT 1";
		var values = [];
        values.push(data.productId);
		sqlConnection.executeQuery(sql, values, function(err, result) {
			callback(err, result);
		});
	},
};