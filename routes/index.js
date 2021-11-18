var express = require('express');
var verifyToken = require("../src/authn/verifyToken");
var router = express.Router();


router.get('/*', function(req, res, next) {
  if(req.query.logout){
    res.clearCookie("access-token");
    res.send("Logout Successfully");
  }
  if(!req.query.login){
    const response = verifyToken(req, res);
    if(response.status != 200){
      return res.status(response.status).send(response);
    }
  }
  res.render('index', { title: 'Ecommerce Application' });
});

module.exports = router;
