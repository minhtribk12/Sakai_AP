var dao = require(__base + 'app/dao');

module.exports = function(app) {

    app.post('/api/admin/resource', function(req, res) {
        var params = [req.body.cid];
        var sql = 'SELECT r.*, a.NAME AS attNAME, a.URL AS attURL FROM resources r LEFT JOIN attachment a ON a.ATTACHMENT_ID = r.ATTACHMENT_ID WHERE course_class_id = ?';

        dao.query(sql, params, function(data) {
            console.log(data)
            res.json(data);
        })
    });

    // TODO : add attachment id
    app.put('/api/admin/resource', function(req, res) {
        var params = [req.body.fileUpdated.NAME, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.RESOURCES_ID];
        var sql = 'UPDATE resources SET name = ?, description = ? WHERE resources_id = ?';

        dao.query(sql, params, function(data) {
            console.log(data)
            res.send(true); //mean: update success
        })
    });

    // TODO: this is delete funciton
    app.delete('/api/admin/resource', function(req, res) {
        var params = [req.body.resId];
        var sql = '';
        res.send(true); // this is dummy -> delete it

        // dao.query(sql, params, function(data){ // uncomment it
        //     res.send(true); //mean: delete success
        // })
    });
}