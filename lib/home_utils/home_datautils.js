var template = require('../template/home_template');
var style = require('../template/style');
var script = require('../template/script');
var st = style.style_home();
exports.login = (req, res) => {

  var fmsg = req.flash();
  var feedback = '';
  if (fmsg.error) {
    feedback = fmsg.error[0];
  }
  var body = template.login_body(feedback)
  var html = template.HTML_home('', body, st)
  res.send(html);
}
exports.logout = (req, res) => {
  req.logout();
  req.session.save(() => {
    res.redirect('/');
  });
}
exports.register = (req, res) => {
  var fmsg = req.flash();
  var feedback = '';
  if (fmsg.error) {
    feedback = fmsg.error[0];
  }
  var sc = script.register_script();
  var body = template.register_body(feedback)
  var html = template.HTML_home(sc, body, st)
  res.send(html)
}
    
