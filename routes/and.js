var express = require('express');
var router = express.Router();
var datautils = require('../lib/and_utils/and_datautils');
var dbutils = require('../lib/and_utils/and_dbutils');

router.post('/decode', (req, res) => {
  datautils.decode(req, res, dbutils.decode);
});

module.exports = router;
