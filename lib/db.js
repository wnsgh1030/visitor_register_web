var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '951030',
    database : 'visitor_register'
  });
db.connect();
module.exports = db;