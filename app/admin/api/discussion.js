var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/discussion', function(req, res) {
        if (req.body.cid == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM discussion d LEFT JOIN users u on u.users_id = d.users_id WHERE d.course_class_id = ?';
            var params = [req.body.cid];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }
    });

    app.post('/api/admin/discussion/detail', function(req, res) {
        if (req.body.discussion_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM message m LEFT JOIN users u on m.users_id = u.users_id WHERE m.discussion_id = ? ORDER BY m.date_created DESC';
            var params = [req.body.discussion_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });
}