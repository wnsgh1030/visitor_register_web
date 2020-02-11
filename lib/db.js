var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'your_DB_host',
  user: 'your_DB_user',
  password: 'your_DB_password',
  database: 'your_DB',
  multipleStatements: true
});
module.exports = pool;