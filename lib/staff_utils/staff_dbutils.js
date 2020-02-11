var db = require('../db');
var template = require('../template/staff_template');
var style = require('../template/style');
var script = require('../template/script');
var QRCode = require('qrcode');
var mail = require('../mailer');

exports.main = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error(err)
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('SELECT * FROM visitor WHERE ? ORDER BY start_date ASC, end_date ASC', post, (err, result) => {
            connection.release();
            if (err) {
                console.error(err)
                var data = {
                    code: 500,
                    message: "방문객 조회 실패"
                };
                res.json(data);
            }
            else {
                var sc = script.staff_main_script();
                var body = template.main_body(result,post.staff_no);
                var st = style.style_staff_main();
                var html = template.HTML_staff(sc, body, st);
                res.send(html);
            }

        })
    })
}
exports.create = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('SELECT DISTINCT name, phone, email FROM visitor WHERE ?', post, (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                var data = {
                    code: 500,
                    message: "최근 방문객 조회 실패"
                };
                res.json(data);
            }
            else {
                var sc = script.create_script();
                var body = template.create_body(result,post.staff_no);
                var st = style.style_staff_create();
                var html = template.HTML_staff(sc, body, st);
                res.send(html);
            }
        })
    })
}
exports.create_proess = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('INSERT INTO visitor SET ?', post, (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                var data = {
                    code: 500,
                    message: "방문객 생성 실패"
                };
                res.json(err);
            }
            else {
                data = JSON.stringify(post)
                QRCode.toFile(__dirname + `/qrcode/${post.start_date} ~ ${post.end_date} ${post.name}.png`, data, (err) => {
                    if (err) {
                        console.log(err);
                        var data = {
                            code: 500,
                            message: "QRcode 생성 실패"
                        };
                        res.json(data);
                    }
                    else {
                        let emailParam = {
                            toEmail: `${post.email}`
                            , subject: `${post.start_date} ~ ${post.end_date} ${post.name}`
                            , text: `${post.pin}`
                            , attachments: [{
                                fileName: `${post.start_date} ~ ${post.end_date} ${post.name}.png`,
                                path: __dirname + `/qrcode/${post.start_date} ~ ${post.end_date} ${post.name}.png`,
                            }]
                        };
                        mail.sendGmail(emailParam);
                        console.log("Success to register");
                        res.redirect(`/staff/${post.staff_no}`);
                    }
                })
            }
        })
    })
}
exports.update = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('SELECT * FROM visitor WHERE no = ? AND staff_no = ?', [post.no, post.staff_no], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                var data = {
                    code: 500,
                    message: "방문객 조회 실패"
                };
                res.json(data);
            }
            else {
                var sc = script.update_script();
                var body = template.update_body(result, post.staff_no, post.no);
                var st = style.style_staff_update();
                var html = template.HTML_staff(sc, body, st);
                res.send(html);

            }
        })
    })
}
exports.update_process = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('UPDATE visitor SET ? WHERE no = ?', [post, post.no], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                var data = {
                    code: 500,
                    message: "방문객 수정 실패"
                };
                res.json(err);
            }
            else {
                data = JSON.stringify(post)
                QRCode.toFile(__dirname + `/qrcode/${post.start_date} ~ ${post.end_date} ${post.name}.png`, data, function (err) {
                    if (err) {
                        console.log(err);
                        var data = {
                            code: 500,
                            message: "QRcode 생성 실패"
                        };
                        res.json(data);
                    }
                    else {
                        let emailParam = {
                            toEmail: `${post.email}`
                            , subject: `${post.start_date} ~ ${post.end_date} ${post.name}`
                            , text: `${post.pin}`
                            , attachments: [{
                                fileName: `${post.start_date} ~ ${post.end_date} ${post.name}.png`,
                                path: __dirname + `/qrcode/${post.start_date} ~ ${post.end_date} ${post.name}.png`,
                            }]
                        };
                        mail.sendGmail(emailParam);
                        console.log("Success to update");
                        res.redirect(`/staff/${post.staff_no}`);
                    }
                })
            }
        })
    })
}
exports.delete_process = (res, post) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            var data = {
                code: 500,
                message: "DB 연결 실패"
            };
            res.json(data);
        }
        connection.query('DELETE FROM visitor WHERE no = ?', post.no, (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                var data = {
                    code: 500,
                    message: "방문객 삭제 실패"
                }; post.no
                console.log(data);
                res.json(err);
            }
            else {
                console.log("Success to delete");
                res.redirect(`/staff/${post.staff_no}`);
            }
        })
    })
}

