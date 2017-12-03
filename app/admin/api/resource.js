var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/resource', function(req, res) {
        var params = [req.body.cid];
        var sql = 'SELECT r.*, a.NAME AS attNAME, a.URL AS attURL FROM resources r LEFT JOIN attachment a ON a.ATTACHMENT_ID = r.ATTACHMENT_ID WHERE course_class_id = ?';

        dao.query(sql, params, function(data) {
            res.json(data);
        })
    });

    app.put('/api/admin/resource/update', function(req, res) {
        var params;
        var sql;

        console.log(req.body)

        if (req.body.fileUpdated.RESOURCES_ID != null) {
            params = [req.body.fileUpdated.NAME, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.ATTACHMENT_ID, req.body.fileUpdated.RESOURCES_ID];];
            sql = 'UPDATE resources SET name = ?, description = ?, attachment_id WHERE resources_id = ?';
        } else {
            params = [req.body.fileUpdated.COURSE_CLASS_ID, req.body.fileUpdated.NAME, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.ATTACHMENT_ID];
            sql = 'INSERT INTO resources(course_class_id, name, description, attachment_id) VALUES(?, ?, ?, ?)';
        }

        dao.query(sql, params, function(data) {
            if (data != null) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });

    app.put('/api/admin/resource/new', function(req, res) {

        var params = [req.body.resource.COURSE.cid, req.body.resource.NAME, req.body.resource.NAME, req.body.resource.ATTACHMENT_ID];
        var sql = 'Insert into RESOURCES (COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID) Values( ?,? ,?, ?);';

        dao.query(sql, params, function(data) {
            res.send(true); //mean: update success
        })
    });

    app.post('/api/admin/resource/delete', function(req, res) {
        var params = [req.body.resId];
        var sql = 'DELETE FROM resources WHERE RESOURCES_ID = ?';

        console.log(sql)
        console.log(req.body)
        dao.query(sql, params, function(data){ // uncomment it
            res.send(true); //mean: delete success
        })
    });
}