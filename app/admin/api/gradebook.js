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

    // TODO: insert to db
    app.put('/api/admin/gradebook', function(req, res) {
        console.log(req.body)
       res.send(false);
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