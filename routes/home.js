var express = require('express');
var router = express.Router();
var datautils = require('../lib/home_utils/home_datautils');
var dbutils = require('../lib/home_utils/home_dbutils'); 

module.exports = function (passport) {

  router.get('/', function (req, res) {
    datautils.login(req, res);
  });

  router.post('/login_process', passport.authenticate('local-login', {
    failureRedirect: '/',
    failureFlash: true,
  }),(req, res) => {
    if (req.user.no === 1){
      res.redirect('/admin');
    }
    else{
      res.redirect(`/staff/${req.user.no}`);
    }
  });

  router.get('/logout', (req, res) => {
    datautils.logout(req, res);
  });
  router.get('/register', (req, res) => {
    datautils.register(req, res);
  })
  router.post('/register_process', (req, res) => {
    dbutils.register_process(req,res);
  })

  return router;
}