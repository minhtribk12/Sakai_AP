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
}