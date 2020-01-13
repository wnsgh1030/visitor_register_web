var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash'); // use passport flash message
var app = express();
const PORT = process.env.PORT 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: '!@$%^&#',
  resave: false,
  saveUninitialized: true
}));
app.use(flash()); // flash message
app.use(express.static(path.join(__dirname, 'public')));
var passport = require('./lib/passport')(app);
var homeRouter = require('./routes/home')(passport);
var staffRouter = require('./routes/staff');
var andRouter = require('./routes/and');
app.use('/', homeRouter);
app.use('/staff',staffRouter);
app.use('/and',andRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT || 3000, function() {
  console.log(`Example app listening on port`)
});

module.exports = app;
