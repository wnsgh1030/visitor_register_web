var moment = require('moment');

exports.decode = (req, res, callback) => {
    var post = {visit_date : moment().format("YYYY-MM-DD"), pin: req.body.pin}
    
    callback(res, post);
}