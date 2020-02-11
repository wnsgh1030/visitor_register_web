var db = require('./db');
module.exports = function (app) {


  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    if(user.no === 1){
      done(null, user.id);
    }
    else{
      done(null, user.no);
    }
  });

  passport.deserializeUser(function (no, done) {
    done(null, { staff: no});
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw'
  },
    function (username, password, done) {

      db.getConnection((err,connection) => {
        if(err){
          console.error(err);
        }
        connection.query('SELECT * FROM staff WHERE `id`=?',[username], (err, rows) =>{
          connection.release();
          var user = rows[0];

          if(err){
            return done(err);
          }
          if(!user){
            return done(null, false, { message: 'Incorrect username.'});
          }
          if(user.pw !== password){
            return done(null, false, {message: 'Incorrect password.'});
          }
          return done(null, user);
        })
      })
    }
  ));
  return passport;
}