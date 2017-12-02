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
        var sql = 'SELECT r.*, a.NAME AS attNAME, a.URL AS attURL FROM resources r LEFT JOIN attachment a ON a.ATTACHMENT_ID = r.ATTACHMENT_ID WHERE course_class_id = ?';

        dao.query(sql, params, function(data){
            console.log(data)
            res.json(data);
        })
    });

    // TODO : this is update for resource
    app.put('/api/admin/resource', function (req, res) {
        console.log(req.body.fileUpdated) // => data in this
        var params = [];
        var sql = '';
        res.send(true);// this is dummy -> delete it

        // dao.query(sql, params, function(data){ // uncomment it
        //     res.send(true); //mean: update success
        // })
    });

    // TODO: this is delete funciton
    app.delete('/api/admin/resource', function (req, res) {
        var params = [req.body.resId];
        var sql = '';
        res.send(true);// this is dummy -> delete it

        // dao.query(sql, params, function(data){ // uncomment it
        //     res.send(true); //mean: delete success
        // })
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
