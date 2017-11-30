var dao = require(__base + 'app/dao');

module.exports = function (app) {
    app.post('/api/admin/login', function (req, res) {
        var sql = 'SELECT users_id, name, email FROM users WHERE users_id = ? AND password = ?';
        var params = [req.body.username, req.body.passwd];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

	// TODO
    app.post('/api/admin/courses', function (req, res) {
        var sql = '';
        var params = [];
        dao.query(sql, params, function(data){
        	// dummy data
            res.json([{a:1},{a:2},{a:3},{a:4}]);
            // res.json(data);
        })
    });
    
	// TODO
    app.post('/api/admin/resource', function (req, res) {

        var sql = '';
        var params = [];
        dao.query(sql, params, function(data){
        	// dummy data
            res.json([{a:1},{a:2},{a:3},{a:4}]);
            // res.json(data);
        })
    });

    // TODO
    app.post('/api/admin/gradebook', function (req, res) {
    	
        var sql = '';
        var params = [];
        dao.query(sql, params, function(data){
        	// dummy data
            res.json([{a:1},{a:2},{a:3},{a:4}]);
            // res.json(data);
        })
    });

};
