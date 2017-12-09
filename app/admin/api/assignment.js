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

    app.put('/api/admin/assignment/submission', function(req, res) {
        var sql = 'INSERT INTO submission(ASSIGNMENT_ID ,USERS_ID ,CONTENT, date_created) VALUES (? , ? , ?, NOW())';
        var params = [req.body.assignment_id, req.body.user.users_id, req.body.submit.CONTENT];

        dao.query(sql, params, function(data) {
            params = [];
            sql = '';
            var resources = req.body.submit.resources;
            if (resources) {
                resources.map(function(resource) {
                    sql += "INSERT INTO submission_attachment (SUBMISSION_ID, ATTACHMENT_ID, ATTACHMENT_DESCRIPTION) VALUES (? , ?, ?); "
                    params.push(data.insertId);
                    params.push(resource.ATTACHMENT_ID);
                    params.push(resource.DESCRIPTION);
                })
            }

            if (sql == '') {
                res.send(true);
            } else {
                dao.query(sql, params, function(data) {
                    if (data != null || data != undefined) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                })
            }
        });

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

            sql = "DELETE FROM assignment_attachment WHERE ASSIGNMENT_ID = ? ; "
            params = [req.body.fileUpdated.ASSIGNMENT_ID];
            dao.query(sql, params, function(data) {
                params = [req.body.fileUpdated.TITLE, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.START_DATE, req.body.fileUpdated.DUE_DATE, req.body.fileUpdated.ASSIGNMENT_ID];
                sql = 'UPDATE assignment SET title = ?, description = ?, start_date = ?, due_date = ? WHERE assignment_id = ? ; ';
                dao.query(sql, params, function(data) {
                    var resources = req.body.fileUpdated.resources;
                    sql = '';
                    params = [];
                    if (resources) {
                        resources.map(function(resource) {
                            sql += "INSERT INTO assignment_attachment (ASSIGNMENT_ID, ATTACHMENT_ID, ATTACHMENT_DESCRIPTION) VALUES (? , ?, ?); "
                            params.push(req.body.fileUpdated.ASSIGNMENT_ID);
                            params.push(resource.ATTACHMENT_ID);
                            params.push(resource.DESCRIPTION);
                        })
                    }
                    if (sql == '') { res.send(true); } else {
                        dao.query(sql, params, function(data) {
                            if (data != null || data != undefined) {
                                res.send(true);
                            } else {
                                res.send(false);
                            }
                        })
                    }
                })

            })

        } else {
            params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.user.users_id, req.body.fileUpdated.TITLE, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.START_DATE, req.body.fileUpdated.DUE_DATE];
            sql = 'INSERT INTO assignment(course_class_id, users_id, title, description, start_date, due_date, date_created) VALUES(?, ?, ?, ?, ?, ?, NOW()); ';
            dao.query(sql, params, function(data) {

                params = [];
                sql = '';
                var resources = req.body.fileUpdated.resources;
                if (resources) {
                    resources.map(function(resource) {
                        sql += "INSERT INTO assignment_attachment (ASSIGNMENT_ID, ATTACHMENT_ID, ATTACHMENT_DESCRIPTION) VALUES (? , ?, ?); "
                        params.push(data.insertId);
                        params.push(resource.ATTACHMENT_ID);
                        params.push(resource.DESCRIPTION);
                    })
                }

                if (sql == '') { res.send(true); } else {
                    dao.query(sql, params, function(data) {
                        if (data != null || data != undefined) {
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                    })
                }
            });
        }

    });

}