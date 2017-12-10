var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/gradebook', function(req, res) {
        if (req.body.cid == null || req.body.user == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM gradebook g LEFT JOIN gradebook_item gi on g.gradebook_item_id = gi.gradebook_item_id WHERE g.users_id = ? AND gi.course_class_id = ?;';
            var params = [req.body.user, req.body.cid];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.post('/api/admin/gradebook/item/id', function(req, res) {
        if (req.body.gradebook_item_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM gradebook_item WHERE gradebook_item_id = ?';
            var params = [req.body.gradebook_item_id];

            dao.query(sql, params, function(data) {
                console.log(data)
                res.send(data[0]);
            });
        }
        
    });
    
    app.put('/api/admin/gradebook', function(req, res) {
        var list_point = req.body.listpoint;
        var user = req.body.user;
        var cdata = req.body.cdata;

        if (list_point == null || user == null || cdata == null) {
            res.send(false);
        } else {
            
            for (i = 0; i < list_point.length; i++) { 
                var grade = list_point[i];
                var sql = 'SELECT * FROM gradebook WHERE users_id = ? AND gradebook_item_id = ?';
                var params = [grade.USERS_ID, cdata.gradebook_item_id];

                dao.query(sql, params, function(data) {
                    if (data.length == 0) {
                        sql = 'INSERT INTO gradebook(gradebook_item_id, users_id, grade, note) VALUES(?, ?, ?, ?)';
                        params = [cdata.gradebook_item_id, grade.USERS_ID, grade.GRADE, grade.NOTE];

                    } else {
                        sql = 'UPDATE gradebook SET grade = ?, note = ? WHERE gradebook_item_id = ? AND users_id = ?';
                        params = [grade.GRADE, grade.NOTE,  cdata.gradebook_item_id, grade.USERS_ID];
                    }

                    dao.query(sql, params, function(data) {
                        
                    })
                })

            }
            res.send(true);
        }
        
    });

    app.put('/api/admin/gradebook/item/delete', function(req, res) {
        if (req.body.gradebook_item_id == null) {
            res.send(false);
        } else {
            var sql = 'DELETE FROM gradebook WHERE gradebook_item_id = ?';
            var params = [req.body.gradebook_item_id];

            dao.query(sql, params, function(data) {
                sql = 'DELETE FROM gradebook_item WHERE gradebook_item_id = ?';

                if (data == null) {
                    res.send(false);
                } else {
                    dao.query(sql, params, function(data) {
                        if (data == null) {
                            res.send(false);
                        } else {
                            res.send(true);
                        }
                    })
                }               
            
            })
        }
        
    });

    app.post('/api/admin/gradebook/item', function(req, res) {
        if (req.body.cid == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM gradebook_item WHERE course_class_id = ?';
            var params = [req.body.cid];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

    app.put('/api/admin/gradebook/item/add', function(req, res) {
        console.log(req.body.gradebook_item_title)
        if (req.body.course_class_id == null || req.body.gradebook_item_title.TITLE == null) {
            res.send(false);
        } else {
            var sql = 'INSERT INTO gradebook_item(title, course_class_id, is_released) VALUES(?, ?, 1)';
            var params = [req.body.gradebook_item_title.TITLE, req.body.course_class_id];

            dao.query(sql, params, function(data) {
                res.json(true);
            })
        }

    });

    app.post('/api/admin/gradebook/item/detail', function(req, res) {
        if (req.body.gradebook_item_id == null || req.body.cid == null) {
            res.send({});
        } else {
            var sql = 'SELECT u.NAME, g.GRADE, g.NOTE FROM gradebook g LEFT JOIN users u ON g.users_id = u.users_id WHERE g.gradebook_item_id = ? UNION SELECT u2.name, null, null FROM users u2 JOIN membership m ON m.users_id = u2.users_id AND m.role = \'student\' AND m.course_class_id = ? AND u2.users_id NOT IN (SELECT users_id FROM gradebook WHERE gradebook_item_id = ?)';

            var params = [req.body.gradebook_item_id, req.body.cid, req.body.gradebook_item_id];

            dao.query(sql, params, function(data) {
                res.json(data);
            })
        }

    });

}