var express = require('express');
var router = express.Router();
var template = require('../lib/home_template');
var db = require('../lib/db');
var alert = require('alert-node')

module.exports = function (passport) {

  router.get('/', function(req, res, next) {
    var fmsg = req.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var html = template.HTML_home(template.login_form(feedback), template.style_home(),'')
    res.send(html);
  }); 

  router.post('/login_process', passport.authenticate('local-login',{
      failureRedirect: '/',
      failureFlash: true,
    }),(req, res)  => {
      res.redirect(`/staff/${req.user.no}`);
    });

  router.get('/logout', (req, res) =>{
    req.logout();
    req.session.save( () => {
      res.redirect('/');
    });
  });
  router.get('/register', (req, res) => {
    var fmsg = req.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var html = template.HTML_home(template.register_form(feedback),template.style_home(),template.register_script())
    res.send(html)
  })
  router.post('/register_process', (req, res) => {
    db.query('SELECT * FROM staff WHERE id = ?', req.body.id, function(error,result){
      if(error){
        throw error;
      }
      else{
        if(result[0] === undefined){
          db.query('INSERT INTO staff SET ?', req.body, function(error,result){
            if(error){
              throw error;
            }
            else{
              console.log("Success to register")
              res.redirect("/login")
            }
          })
        }
        else{
          console.log("Duplicated ID")
          req.flash('error', "Duplicated ID");
          res.redirect("/register")
        }
      }
    })
  })

  return router;
}