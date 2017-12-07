var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/announcement', function(req, res) {
        var sql = 'SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = ? ORDER BY DATE_CREATED DESC';
        var params = [req.body.cid];

        if (req.body.cid == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }
    });

    app.post('/api/admin/announcement/recent', function(req, res) {
        var sql = `SELECT a.COURSE_CLASS_ID, c.TITLE AS CLASS_NAME, a.ANNOUNCEMENT_ID, a.CONTENT, a.DATE_CREATED, a.TITLE, u.NAME AS AUTHOR_NAME
            FROM announcement a 
            LEFT JOIN users u ON a.users_id = u.users_id 
            LEFT JOIN course_class cc ON cc.course_class_id = a.course_class_id 
            LEFT JOIN course c ON cc.course_id = c.course_id  
            WHERE a.course_class_id IN (
                SELECT m.course_class_id 
                FROM membership m 
                WHERE m.users_id = ?) 
            ORDER BY date_created 
            DESC LIMIT 5;`
        var params = [req.body.user_id];

        if (req.body.user_id == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data) {
                console.log(data)
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

            sql = "DELETE FROM announcement_attachment WHERE ANNOUNCEMENT_ID = ? ; "
            params = [req.body.fileUpdated.ANNOUNCEMENT_ID];

            dao.query(sql, params, function(data) {
                params = [req.body.fileUpdated.TITLE, req.body.fileUpdated.CONTENT, req.body.fileUpdated.ANNOUNCEMENT_ID];
                sql = 'UPDATE announcement SET title = ?, content = ?  WHERE ANNOUNCEMENT_ID = ? ; ';
                dao.query(sql, params, function(data) {
                    var resources = req.body.fileUpdated.resources;
                    sql = '';
                    params = [];
                    if (resources) {
                        resources.map(function(resource) {
                            sql += "INSERT INTO announcement_attachment (ANNOUNCEMENT_ID, ATTACHMENT_ID, ATTACHMENT_DESCRIPTION) VALUES (? , ?, ?); "
                            params.push(req.body.fileUpdated.ANNOUNCEMENT_ID);
                            params.push(resource.ATTACHMENT_ID);
                            params.push(resource.DESCRIPTION);
                        })
                    }
                    dao.query(sql, params, function(data) {
                        if (data != null || data != undefined) {
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                    })
                })

            })
        } else {
            params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.user.users_id, req.body.fileUpdated.TITLE, req.body.fileUpdated.CONTENT];
            sql = 'INSERT INTO announcement(course_class_id, users_id, title, content, date_created) VALUES(?, ?, ?, ?, NOW())';

            dao.query(sql, params, function(data) {

                params = [];
                sql = '';
                var resources = req.body.fileUpdated.resources;
                if (resources) {
                    resources.map(function(resource) {
                        sql += "INSERT INTO announcement_attachment (ANNOUNCEMENT_ID, ATTACHMENT_ID, ATTACHMENT_DESCRIPTION) VALUES (? , ?, ?); "
                        params.push(data.insertId);
                        params.push(resource.ATTACHMENT_ID);
                        params.push(resource.DESCRIPTION);
                    })
                }


                dao.query(sql, params, function(data) {
                    if (data != null || data != undefined) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                })
            });

        }
    });
}