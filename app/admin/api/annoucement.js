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

    app.put('/api/admin/announcement/update', function(req, res) {
        var params;
        var sql;

        if (req.body.fileUpdated.ANNOUNCEMENT_ID != null) {
            params = [req.body.fileUpdated.TITLE, req.body.fileUpdated.CONTENT, req.body.fileUpdated.ANNOUNCEMENT_ID];
            sql = 'UPDATE announcement SET title = ?, content = ? WHERE announcement_id = ?';
        } else {
            params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.user.users_id, req.body.fileUpdated.TITLE, req.body.fileUpdated.CONTENT];
            sql = 'INSERT INTO announcement(course_class_id, users_id, title, content, date_created) VALUES(?, ?, ?, ?, NOW())';
            //TODO: upload files, create attachments
        }

        dao.query(sql, params, function(data) {
            if (data != null) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });
}