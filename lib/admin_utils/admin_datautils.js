exports.search = (req, res, callback) => {
  var post = {visit_date : req.body.visit_date};

  callback(res, post);
}
