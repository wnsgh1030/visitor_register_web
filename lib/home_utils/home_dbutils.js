var db = require("../db");

exports.register_process = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      var data = {
        code: 500,
        message: "DB 연결 실패"
      };
      res.json(data)
    }
    connection.query('SELECT * FROM staff WHERE id = ?', req.body.id, (err, result) => {
      if (err) {
        console.error(err);
        var data = {
          code: 500,
          message: "ID 중복 검사 실패"
        };
        res.json(data);
      }
      else {
        if (result[0] === undefined) {
          connection.query('INSERT INTO staff SET ?', req.body, (err, result1) => {
            connection.release();
            if (err) {
              console.error(err);
              var data = {
                code: 500,
                message: "계정 생성 실패"
              };
              res.json(data);
            }
            else {
              console.log("Created staff");
              res.redirect("/")
            }
          })

        }
        else {
          console.log("Duplicated ID");
          req.flash('error', "Duplicated ID");
          res.redirect("/register");
        }
      }
    })
  })
}
