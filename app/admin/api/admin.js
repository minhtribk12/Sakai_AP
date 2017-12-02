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
        var params = [req.body.users_id];
        var sql = 'SELECT * FROM course_class cc LEFT JOIN course c ON cc.course_id = c.course_id WHERE cc.course_class_id IN (SELECT m.course_class_id FROM membership m WHERE m.users_id = ?);';

        dao.query(sql, params, function(data){
            res.json(data);
        })
    });
    
	// TODO
    app.post('/api/admin/resource', function (req, res) {
        var params = [req.body.cid];
        var sql = 'SELECT * FROM resources WHERE course_class_id = ?';

        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    // TODO
    app.post('/api/admin/gradebook', function (req, res) {
    	
        var sql = 'SELECT * FROM gradebook';
        var params = [];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });


    app.post('/api/admin/announcement', function (req, res) {
        var sql = 'SELECT * FROM announcement WHERE TRUE;'; // TODO
        var params = [];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });
};
