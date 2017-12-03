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

    // cannot edit discussions
    app.put('/api/admin/discussion/add', function(req, res) {
        var params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.user.users_id, req.body.fileUpdated.TOPIC];
        var sql = 'INSERT INTO discussion(course_class_id, users_id, topic, date_created) VALUES(?, ?, ?, NOW())';
            //TODO: upload files, create attachments
       
        dao.query(sql, params, function(data) {
            if (data != null) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });

    // cannot edit messages
    app.put('/api/admin/discussion/message/add', function(req, res) {
        var params = [req.body.fileUpdated.DISCUSSION_ID, req.body.user.users_id, req.body.fileUpdated.CONTENT];
        var sql = 'INSERT INTO message(discussion_id, users_id, content, date_created) VALUES(?, ?, ?, NOW())';
            //TODO: upload files, create attachments
       
        dao.query(sql, params, function(data) {
            if (data != null) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });
}