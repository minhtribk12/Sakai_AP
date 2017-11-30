var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file');
var app = express();

// port config
var port = 8081;

//config root directory
global.__base = __dirname + '/';

// favicon using
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/uploads', function (req, res) {
  upload(req, res, function (err,data) {
    if (err) {
      // An error occurred when uploading
      return res.end("Error uploading file.");
    }
    res.send('/uploads/' + req.file.filename);
  })
})

// router init
require('./app/routes')(app);

// make app listen on port
app.listen(port, function(){
  d = new Date();
  console.log( d.toLocaleString() +  ' SERVER RUNNING ON PORT ' + port);
});

module.exports = app;