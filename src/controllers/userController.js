const User = require("../models/user");
const {
	httpCodes
} = require("../constants/backendConfig");

module.exports = {
	login: function (req, res) {
		var data = req.body;
		var responseData = {
			success: false,
			msg: "Invalid params for login"
		};
		if (data.username && data.password) {
			User.login(data, function (err, result) {
				if (err) {
					responseData.msg = "Error in login";
					return res.status(httpCodes.internalServerError).send(responseData);
				}
				if (result.length === 0) {
					responseData.msg = "Invalid Email or Password";
					return res.status(httpCodes.internalServerError).send(responseData);
				}
				responseData.success = true;
				responseData.msg ="Successfully Logged In";
				responseData.data = {
					username: result[0].Username,
					userId: result[0].UserId,
					userType: result[0].UserType
				};
				return res.status(httpCodes.success).send(responseData);
			});
		} else {
			return res.status(httpCodes.badRequest).send(responseData);
		}
	},

	signup: function (req, res) {
		var data = req.body;
		var responseData = {
			success: false,
			msg: "Invalid params for signup"
		};
		if (data.username && data.password && data.userType) {
			User.signup(data, function (err, result) {
				if (err) {
					responseData.msg = "Error in signup";
					return res.status(httpCodes.internalServerError).send(responseData);
				}
				responseData.success = true;
				responseData.data = {
					username: data.username,
					userId: result.insertId,
					userType: data.userType
				};
				return res.status(httpCodes.success).send(responseData);
			});
		} else {
			return res.status(httpCodes.badRequest).send(responseData);
		}
	},

	getVendorDetails: function (req, res) {
	},

	getVendorPayments: function (req, res) {
	}
};