var express = require('express');
var router = express.Router();
var datautils = require('../lib/staff_utils/staff_datautils');
var dbutils = require('../lib/staff_utils/staff_dbutils');


router.get('/:staff_no', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.main_create(req, res, dbutils.main);
  }
})

router.get('/:staff_no/create', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.main_create(req, res, dbutils.create);
  }

})
router.post('/:staff_no/create_process', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.create_process(req, res, dbutils.create_proess);
  }

})

router.get('/:staff_no/update/:visitor_no', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.update(req, res, dbutils.update);
  }

})

router.post('/:staff_no/update_process/:visitor_no', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.update_process(req, res, dbutils.update_process);
  }

})

router.post('/:staff_no/delete/:visitor_no', (req, res) => {
  if (req.session.passport === undefined || req.session.passport.user != req.params.staff_no) {
    req.session.destroy();
    res.redirect('/');
  }
  else {
    datautils.delete_process(req, res, dbutils.delete_process);
  }

})

module.exports = router;
