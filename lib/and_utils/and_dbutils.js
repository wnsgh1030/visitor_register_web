var db = require('../db');
var moment = require('moment');
var mail = require('../mailer');


exports.decode = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query(`select v.name, s.email AS staff, visit_check, v.phone, s.name AS sname, v.no AS v_no, purpose FROM visitor AS v, staff AS s 
        WHERE v.staff_no = s.no AND v.pin = "${post.pin}" AND v.start_date <= "${post.visit_date}" AND "${post.visit_date}" <= v.end_date  `, (err, result) => {
            connection.release();
            if (err) {
                console.error(err)
                var data = {
                    code: 500,
                    message: "PIN 조회 실패"
                };
                res.json(data);
            }
            else {
                var data = { code: "", message: "" }
                if (result[0] === undefined) {
                    data.code = 200;
                    data.message = "WRONG"
                    res.json(data);
                }
                else {
                    var visit_check = result[0].visit_check;
                    if (result[0].visit_check === 0 || result[0].visit_check === 2) {
                        data.code = 200;
                        data.message = "WELCOME"
                        visit_check = 1;
                        let emailParam = {
                            toEmail: `${result[0].staff}`
                            , subject: `${post.visit_date} ${result[0].name}님이 입장했습니다.`
                            , text: `${moment().format("YYYY-MM-DD h:mma")}에 ${result[0].name}님이 입장했습니다.`
                        };
                        mail.sendGmail(emailParam);
                    }
                    else {
                        data.code = 200;
                        data.message = "GOODBYE";
                        visit_check = 2;
                        let emailParam = {
                            toEmail: `${result[0].staff}`
                            , subject: `${post.visit_date} ${result[0].name}님이 퇴장했습니다.`
                            , text: `${moment().format("YYYY-MM-DD h:mma")}에 ${result[0].name}님이 퇴장했습니다.`
                        };
                        mail.sendGmail(emailParam);

                    }
                    res.json(data);
                    var input = {
                        name: result[0].name,
                        phone: result[0].phone,
                        visit_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                        purpose: result[0].purpose,
                        visit_check: visit_check,
                        v_no: result[0].v_no,
                        staff_name: result[0].sname
                    }
                    this.insert_log(input, post.pin);

                }
            }
        })
    })
}
exports.insert_log = (input, pin) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        else {
            var sql = `UPDATE visitor SET visit_check = ${input.visit_check} WHERE pin = "${pin}";` + `INSERT INTO logs SET ?;`
            connection.query(sql, input, (err, result) => {
                connection.release();
                if (err) {
                    data.code = 500;
                    data.message = "여부 수정 실패";
                    res.json(err);
                }
                else {
                    console.log(result);
                }
            })
        }
    })


} 
