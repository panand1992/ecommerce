const User = require("../models/user");
const {
	httpCodes
} = require("../constants/backendConfig");

module.exports = {
	userLogin: function (req, res) {
		var data = req.body;
		var errorMsg = "Invalid params for login";
		if (data.username && data.password) {
			User.login(data, function (err, result) {
				var responseData = {
					success: false
				};
				if (err) {
					errorMsg = "Error in login";
					return res.status(httpCodes.internalServerError).send(errorMsg);
				}
				if (result.length === 0) {
					responseData.msg = "Invalid Email or Password";
					return res.status(httpCodes.success).send(responseData);
				}
				responseData.success = true;
				responseData.data = {
					username: result[0].Username
				};
				return res.status(httpCodes.success).send(responseData);
			});
		} else {
			return res.status(httpCodes.internalServerError).send(errorMsg);
		}
	}
};