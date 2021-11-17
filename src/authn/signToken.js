const jwt = require("jsonwebtoken");
const {
	secretKey
} = require("../constants/backendConfig");

const signToken = (httpResponse, userData) => {
    const token = jwt.sign(userData,
    secretKey,
    {
        expiresIn: "1h"
    });

    httpResponse.cookie("access-token", token);
}

module.exports = signToken;