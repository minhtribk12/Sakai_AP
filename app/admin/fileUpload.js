var multer = require('multer');
var fs = require('fs');
var friendlyURL = require(__base + 'app/friendlyURL');
var dao = require(__base + 'app/dao');

module.exports = function(app) {
    app.post('/fastFileUpload', multer({ storage: storage }).any(), uploadFile);
}

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/UploadFile');
    },
    filename: function(req, file, callback) {
        var preName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        var postName = file.originalname.substring(file.originalname.lastIndexOf('.'));
        preName = preName.replace(/ /g, '-')
        friendlyURL(preName, function(url) {
            callback(null, url + '-' + Date.now() + postName);
        })
    }
});

var uploadFile = function(req, res) {
    if (!req.files) req.files = [];
    req.files.map(function(file) {
        /*file : { fieldname: 'file-0',
		  originalname: 'eclipse.ini',
		  encoding: '7bit',
		  mimetype: 'application/octet-stream',
		  destination: './public/UploadFile',
		  filename: 'eclipse-1512232371830.ini',
		  path: 'public\\UploadFile\\eclipse-1512232371830.ini',
		  size: 569 }*/

        var sql = '';
        var params = [req.body.username, req.body.passwd];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    })

    res.send(200);

}