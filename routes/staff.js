var express = require('express');
var router = express.Router();
var template = require('../lib/home_template');
var stemplate = require('../lib/staff_template');
var db = require('../lib/db');
var rand = require('../lib/rand');
var QRCode = require('qrcode');
var mail = require('../lib/mailer');
var fs = require('fs');
router.get('/:staff_no', (req, res) => {
  db.query('SELECT * FROM visitor WHERE staff_no = ?', req.params.staff_no, function (error, result) {
    if (error) {
      throw error;
    }
    else {
      var list = stemplate.list_form(result, req.params.staff_no)
      var html = stemplate.HTML_staff(``, list, stemplate.style_main())

      res.send(html)
    }
  })
})

router.get('/:staff_no/create', (req, res) => {
  db.query('SELECT * FROM visitor WHERE staff_no = ?', req.params.staff_no, function (error, result) {
    if (error) {
      throw error;
    }
    else {
      var html = stemplate.HTML_staff(stemplate.create_script(), stemplate.create_form(result, req.params.staff_no), stemplate.style_main())
      res.send(html)
    }

  })
})
router.post('/:staff_no/create_process', (req, res) => {
  req.body.staff_no = req.params.staff_no
  req.body.visit_check = 0
  pin = req.body.visit_date + rand.authNo()
  req.body.pin = pin.replace("-", "")
  db.query('INSERT INTO visitor SET ?', req.body, function (error, result) {
    if (error) {
      throw error;
    }
    else {
      data = JSON.stringify(req.body)
      console.log(data)
      QRCode.toFile(__dirname + `/qrcode/${req.body.visit_date}${req.body.name}.png`, data, function (err) {
        if (err) throw err
        console.log('done')

        let emailParam = {
          toEmail: `${req.body.email}`
          , subject: `${req.body.visit_date}${req.body.name}`
          , attachments: [{
            fileName: `${req.body.visit_date}${req.body.name}.png`,
            path: __dirname + `/qrcode/${req.body.visit_date}${req.body.name}.png`,
          }]
        };
        mail.sendGmail(emailParam);
      })
      console.log("Success to register")
      res.redirect(`/staff/${req.params.staff_no}`)
    }
  })// QR코드 전송 구현
})

router.get('/:staff_no/update/:visitor_no', (req, res) => {
  db.query('select * from visitor where no = ?', req.params.visitor_no, function (err, result) {
    if (err) {
      throw err;
    }
    else {
      var html = stemplate.HTML_staff('',stemplate.update_form(result, req.params.staff_no, req.params.visitor_no),stemplate.style_main())
      // var html = stemplate.HTML_home(
      //   `<form action="/staff/${req.params.staff_no}/update_process/${req.params.visitor_no}" method="post">
      //   <p>NAME:<input type="text" name="name" value = ${name}></p>
      //   <p>PHONE:<input type="tel" name="phone" title="전화번호를 입력하세요." value=${phone} pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13">
      //   <p>EMAIL:<input type="text" name="email" value=${email}></p>
      //   <p>PURPOSE:<input type="text" name="purpose" value=${purpose}></p>
      //   <p>DATE:<input type="date" name="visit_date"></p>
      //   <p><input type="submit" value="수정"/></p></form>`
      // )
      res.send(html)
    }
  })
})

router.post('/:staff_no/update_process/:visitor_no', (req, res) => {
  pin = req.body.visit_date + rand.authNo()
  req.body.pin = pin.replace("-", "")
  db.query(`UPDATE visitor SET ? WHERE no = ${req.params.visitor_no}`, req.body, function (error, result) {
    if (error) {
      throw error;
    }
    else {
      data = JSON.stringify(req.body)
      console.log(data)
      QRCode.toFile(__dirname + `/qrcode/${req.body.visit_date}${req.body.name}.png`, data, function (err) {
        if (err) throw err
        console.log('done')
        let emailParam = {
          toEmail: `${req.body.email}`
          , subject: `${req.body.visit_date}${req.body.name}`
          , attachments: [{
            fileName: `${req.body.visit_date}${req.body.name}.png`,
            path: __dirname + `/qrcode/${req.body.visit_date}${req.body.name}.png`,
          }]
        };
        mail.sendGmail(emailParam);
      })
      console.log("Success to update")
      res.redirect(`/staff/${req.params.staff_no}`)
    }
  })
})

router.post('/:staff_no/delete/:visitor_no', (req, res) => {
  db.query(`DELETE FROM visitor WHERE no = ?`, req.params.visitor_no, function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log("Success to delete")
      res.redirect(`/staff/${req.params.staff_no}`)
    }
  })
})

module.exports = router;
