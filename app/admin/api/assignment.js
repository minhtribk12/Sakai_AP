var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/assignment', function(req, res) {
        var sql = 'SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = ?';
        var params = [req.body.cid];

        if (req.body.cid == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }
    });

    app.post('/api/admin/assignment/detail', function(req, res) {
        if (req.body.assignment_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.assignment_id = ?';
            var params = [req.body.assignment_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.post('/api/admin/assignment/attachment', function(req, res) {
        if (req.body.assignment_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN assignment_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.assignment_id = ?';
            var params = [req.body.assignment_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.post('/api/admin/assignment/submission', function(req, res) {
        if (req.body.assignment_id == null || req.body.user_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM submission s WHERE s.assignment_id = ? AND s.users_id = ? ORDER BY DATE_CREATED DESC';
            var params = [req.body.assignment_id, req.body.user_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.post('/api/admin/assignment/submission/attachment', function(req, res) {
        if (req.body.assignment_id == null || req.body.user_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN submission_attachment sa ON a.attachment_id = sa.attachment_id WHERE sa.submission_id = (SELECT submission_id FROM submission WHERE assignment_id = ? AND users_id = ? ORDER BY DATE_CREATED DESC LIMIT 1)';
            var params = [req.body.assignment_id, req.body.user_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.put('/api/admin/assignment/update', function(req, res) {
        var params;
        var sql;

        if (req.body.fileUpdated.START_DATE != null) {
            req.body.fileUpdated.START_DATE = new Date(Date.parse(req.body.fileUpdated.START_DATE))
        }
        if (req.body.fileUpdated.DUE_DATE != null) {
            req.body.fileUpdated.DUE_DATE = new Date(Date.parse(req.body.fileUpdated.DUE_DATE))
        }

        if (req.body.fileUpdated.ASSIGNMENT_ID != null) {
            params = [req.body.fileUpdated.TITLE, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.ASSIGNMENT_ID];
            sql = 'UPDATE assignment SET title = ?, description = ?, start_date = ?, due_date = ? WHERE assignment_id = ?';
        } else {
            params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.user.users_id, req.body.fileUpdated.TITLE, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.START_DATE, req.body.fileUpdated.DUE_DATE];
            sql = 'INSERT INTO assignment(course_class_id, users_id, title, description, start_date, due_date, date_created) VALUES(?, ?, ?, ?, ?, ?, NOW())';
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