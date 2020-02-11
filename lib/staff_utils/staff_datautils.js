var rand = require('../rand');
exports.main_create = (req, res, callback) => {
    var post = { staff_no: req.params.staff_no };
    
    callback(res, post);
}
exports.create_process= (req, res, callback) => {
    req.body.staff_no = req.params.staff_no;
    req.body.visit_check = 0;
    pin = req.body.start_date + rand.authNo();
    req.body.pin = pin.replace("-", "");
    var post = req.body;

    delete post.today;

    callback(res, post);
}
exports.update = (req, res, callback) => {
    var post = { no: req.params.visitor_no, staff_no: req.params.staff_no};

    callback(res, post);
}
exports.update_process = (req, res, callback) => {
    pin = req.body.start_date + rand.authNo();
    req.body.pin = pin.replace("-", "");
    req.body.no = req.params.visitor_no;
    req.body.staff_no = req.params.staff_no;
    var post = req.body;

    delete post.today;

    callback(res, post);
}
exports.delete_process = (req, res, callback) => {
    var post = { no: req.params.visitor_no, staff_no: req.params.staff_no};

    callback(res, post);
}
