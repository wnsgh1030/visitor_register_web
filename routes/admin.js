var express = require('express');
var router = express.Router();
var datautils = require('../lib/admin_utils/admin_datautils');
var dbutils = require('../lib/admin_utils/admin_dbutils'); 


router.get('/', function (req, res, next) {
  if (req.session.passport === undefined || req.session.passport.user != "admin") {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    dbutils.main(res);
  }
  
});
router.post('/search', function(req, res, next){
  if (req.session.passport === undefined || req.session.passport.user != "admin") {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.search(req, res, dbutils.search);
  }
})

module.exports = router;
