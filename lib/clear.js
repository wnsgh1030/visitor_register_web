var db = require('./db');
var schedule = require("node-schedule");
var moment = require("moment");

exports.clear = () => {
  var rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  var visit_date = moment().format("YYYY-MM-DD");
  var job = schedule.scheduleJob(rule, function () {
    console.log("good")
    db.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        var data = {
          code: 500,
          message: "DB 연결 실패"
        };
        res.json(data)
      }
      connection.query(`UPDATE visitor SET visit_check = 0 WHERE start_date <= "${visit_date}" AND "${visit_date}" <= end_date;`, (err, result) => {
        if (err) {
          var data = {
            code: 500,
            message: "초기화 실패"
          };
          throw err
        }
        else {
          console.log(result);
        }
      })
    })
  })
}

