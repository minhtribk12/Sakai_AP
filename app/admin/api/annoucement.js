var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/announcement', function(req, res) {
        var sql = 'SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = ?';
        var params = [req.body.cid];

        if (req.body.cid == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }
    });

    app.post('/api/admin/announcement/detail', function(req, res) {
        if (req.body.announcement_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.announcement_id = ?';
            var params = [req.body.announcement_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.post('/api/admin/announcement/attachment', function(req, res) {
        if (req.body.announcement_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN announcement_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.announcement_id = ?';
            var params = [req.body.announcement_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });
}