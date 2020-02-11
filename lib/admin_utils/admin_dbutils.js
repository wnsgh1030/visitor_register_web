var db = require("../db");
var moment = require("moment");
var template = require('../template/admin_template');
var style = require('../template/style');
var script = require('../template/script');

exports.main = (res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      var data = {
        code: 500,
        message: "DB 연결 실패"
      };
      res.json(data);
    }
    var date = moment().format("YYYY-MM-DD")
    connection.query(`select * from admin_main;`, (err, result) => {
      connection.release();
      if (err) {
        console.error(err);
        var data = {
          code: 500,
          message: "방문객 조회 실패"
        };
        res.json(data);
      }
      else {
        var form = template.current_list_form(result);
        var table = template.current_table();
        var sc = script.search_script();
        var body = template.admin_body(form, table, "방문리스트");
        var st = style.style_admin();
        html = template.HTML_admin(sc, body, st);
        res.send(html);
      }
    })
  })
}
exports.search = (res, post) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      var data = {
        code: 500,
        message: "DB 연결 실패"
      };
      res.json(data);
    }
    connection.query(`SELECT * FROM logs WHERE DATE(visit_date) = DATE("${post.visit_date}")`, (err, result1) => {
      if (err) {
        console.error(err);
        var data = {
          code: 500,
          message: "방문객 로그 실패"
        };
        res.json(data);
      }
      else {
        connection.query(`SELECT * FROM 
        (SELECT * FROM admin_search WHERE no NOT IN (SELECT v_no FROM logs WHERE DATE(visit_date) = "${post.visit_date}") AND start_date <= "${post.visit_date}" AND "${post.visit_date}" <= end_date ) AS A, 
        (SELECT no, name AS staff_name FROM staff) AS B WHERE A.staff_no = B.no`, (err, result2) => {
              connection.release();
          if (err) {
            console.error(err);
            var data = {
              code: 500,
              message: "방문객 현황 실패"
            };
            res.json(data);
          }
          else {
            var result = result2.concat(result1);
            var form = template.search_list_form(result, post.visit_date);
            var table = template.search_table();
            var sc = script.search_script();
            var body = template.admin_body(form, table, "방문로그");
            var st = style.style_admin();
            html = template.HTML_admin(sc, body, st);
            res.send(html);
          }
        })
      }
    })
  })
}


