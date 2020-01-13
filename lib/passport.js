var db = require('./db');
module.exports = function (app) {


  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.query('SELECT * FROM staff WHERE `id`=?', [id], function (err, rows) {
      var user = rows[0];
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw'
  },
    function (username, password, done) {


      db.query('SELECT * FROM staff WHERE `id`=?', [username], function (err, rows) {
        var user = rows[0];

        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.pw !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  


  // db.query('SELECT * FROM staff WHERE id = ?', req.body.id, function(error,result){
  //   if(error){
  //     throw error;
  //   }
  //   else{
  //     if(result[0] === undefined){
  //       db.query('INSERT INTO staff SET ?', req.body, function(error,result){
  //         if(error){
  //           throw error;
  //         }
  //         else{
  //           console.log("Success to register")
  //           res.redirect("/")
  //         }
  //       })
  //     }
  //     else{
  //       console.log("Duplicated ID")
  //       res.redirect("/register")
  //     }
  //   }
  // })
  return passport;
}