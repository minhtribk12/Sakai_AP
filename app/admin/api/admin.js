var dao = require(__base + 'app/dao');

module.exports = function (app) {
    app.post('/api/admin/login', function (req, res) {
        var sql = 'SELECT users_id, name, email FROM users WHERE users_id = ? AND password = ?';
        var params = [req.body.username, req.body.passwd];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    app.post('/api/admin/courses', function (req, res) {
        var params = [req.body.users_id];
        var sql = 'SELECT * FROM course_class cc LEFT JOIN course c ON cc.course_id = c.course_id WHERE cc.course_class_id IN (SELECT m.course_class_id FROM membership m WHERE m.users_id = ?);';

        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    app.post('/api/admin/courses/teacher', function (req, res) {
        var params = [req.body.user_id, req.body.course_id];
        var sql = 'SELECT * FROM membership m WHERE m.users_id = ? AND m.course_class_id = ? AND m.role = \'teacher\'';

        dao.query(sql, params, function(data){
            //res.send([{admin:true}])
            res.json(data);
        })
    });
    
    app.post('/api/admin/ongoing', function (req, res) {
        var sql = 'SELECT * FROM membership m LEFT JOIN course_class cc ON m.course_class_id = cc.course_class_id LEFT JOIN course c ON c.course_id = cc.course_id WHERE m.users_id = ? AND c.end_date > now() AND c.start_date < now();';
        var params = [req.body.user_id];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    app.post('/api/admin/profile', function (req, res) {
        var sql = 'SELECT users_id as id, email, name FROM users WHERE users_id = ?';
        var params = [req.body.user_id];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });
};
