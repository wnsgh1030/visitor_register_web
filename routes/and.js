var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.post('/decode', (req, res) => {
  var pin = req.body.pin
  console.log(pin)
  db.query('SELECT * FROM visitor WHERE pin = ?',pin, (err,result) => {
    if(err) throw err;
    else{
      console.log(result[0])
      if(!result[0]) res.send("no")
      
      else res.send("ok")
      
    }

  })
});

module.exports = router;
