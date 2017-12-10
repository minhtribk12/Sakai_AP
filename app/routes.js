// api
var main = require('./api/main');

var fileUpload = require('./admin/fileUpload');

// admin api
var admin = require('./admin/api/admin');
var annoucement = require('./admin/api/annoucement');
var assignment = require('./admin/api/assignment');
var discussion = require('./admin/api/discussion');
var gradebook = require('./admin/api/gradebook');
var resource = require('./admin/api/resource');

module.exports = function (app) {
    
  // api route generate
  main(app);

  annoucement(app);
  assignment(app);
  discussion(app);
  gradebook(app);
  resource(app);

  // admin api route generate
  admin(app);
  // other route generate
  fileUpload(app);
  
  app.get('/sakai', function (req, res) {
    res.sendFile(__base + './public/views/index_admin.html');
  });
  
  app.get('/sakai/login', function (req, res) {
    res.sendFile(__base + './public/views/partials/admin/login.html');
  });
  
  app.get('/sakai/*', function (req, res) {
    res.sendFile(__base + './public/views/index_admin.html');
  });
  
  app.get('*', function (req, res) {
    //res.sendFile(__base + './public/views/index.html');
    res.redirect('/sakai')
  });

}