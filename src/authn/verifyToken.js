const jwt = require("jsonwebtoken");
const {
	secretKey
} = require("../constants/backendConfig");

const verifyToken = (req)=> {
    let token = req.cookies["access-token"];
    if(!token){
        return {status: 403, msg: "Unathorised User"};
    }

    try{
        let decodedData = jwt.verify(token, secretKey);
        req.userinfo = decodedData;
        return {status: 200};
    } catch(err){
        return {status: 401, msg: "Invalid Token"};
    }
}

module.exports = verifyToken;