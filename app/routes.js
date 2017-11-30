// api
var main = require('./api/main');

// admin api
var admin = require('./admin/api/admin');

module.exports = function (app) {
    
  // api route generate
  main(app);
  // admin api route generate
  admin(app);
  // other route generate
  
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
    res.sendFile(__base + './public/views/index.html');
  });

}