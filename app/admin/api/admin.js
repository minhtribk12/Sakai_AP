var dao = require(__base + 'app/dao');

module.exports = function (app) {
    app.post('/api/admin/login', function (req, res) {
        var sql = 'SELECT users_id, name, email FROM users WHERE users_id = ? AND password = ?';
        var params = [req.body.username, req.body.passwd];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    app.post('/api/admin/courses', function (req, res) {
        var params = [req.body.users_id];
        var sql = 'SELECT * FROM course_class cc LEFT JOIN course c ON cc.course_id = c.course_id WHERE cc.course_class_id IN (SELECT m.course_class_id FROM membership m WHERE m.users_id = ?);';

        dao.query(sql, params, function(data){
            res.json(data);
        })
    });
    
	app.post('/api/admin/resource', function (req, res) {
        var params = [req.body.cid];
        var sql = 'SELECT r.*, a.NAME AS attNAME, a.URL AS attURL FROM resources r LEFT JOIN attachment a ON a.ATTACHMENT_ID = r.ATTACHMENT_ID WHERE course_class_id = ?';

        dao.query(sql, params, function(data){
            console.log(data)
            res.json(data);
        })
    });

    // TODO : add attachment id
    app.put('/api/admin/resource', function (req, res) {
        var params = [req.body.fileUpdated.NAME, req.body.fileUpdated.DESCRIPTION, req.body.fileUpdated.RESOURCES_ID];
        var sql = 'UPDATE resources SET name = ?, description = ? WHERE resources_id = ?';

        dao.query(sql, params, function(data){ 
            console.log(data)
            res.send(true); //mean: update success
        })
    });

    // TODO: this is delete funciton
    app.delete('/api/admin/resource', function (req, res) {
        var params = [req.body.resId];
        var sql = '';
        res.send(true);// this is dummy -> delete it

        // dao.query(sql, params, function(data){ // uncomment it
        //     res.send(true); //mean: delete success
        // })
    });

    app.post('/api/admin/announcement', function (req, res) {
        var sql = 'SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = ?';
        var params = [req.body.cid];

        if (req.body.cid == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
    });

    app.post('/api/admin/announcement/detail', function (req, res) { 
        if (req.body.announcement_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM announcement a LEFT JOIN users u on u.users_id = a.users_id WHERE a.announcement_id = ?';
            var params = [req.body.announcement_id];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/announcement/attachment', function (req, res) { 
        if (req.body.announcement_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN announcement_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.announcement_id = ?';
            var params = [req.body.announcement_id];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/assignment', function (req, res) {
        var sql = 'SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.course_class_id = ?';
        var params = [req.body.cid];

        if (req.body.cid == null) {
            res.send({});
        } else {
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
    });

    app.post('/api/admin/assignment/detail', function (req, res) { 
        if (req.body.assignment_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM assignment a LEFT JOIN users u on u.users_id = a.users_id WHERE a.assignment_id = ?';
            var params = [req.body.assignment_id];

            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/assignment/attachment', function (req, res) { 
        if (req.body.assignment_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN assignment_attachment aa ON a.attachment_id = aa.attachment_id WHERE aa.assignment_id = ?';
            var params = [req.body.assignment_id];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/assignment/submission', function (req, res) { 
        if (req.body.assignment_id == null || req.body.user_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM submission s WHERE s.assignment_id = ? AND s.users_id = ? ORDER BY DATE_CREATED DESC';
            var params = [req.body.assignment_id, req.body.user_id];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/assignment/submission/attachment', function (req, res) { 
        if (req.body.assignment_id == null || req.body.user_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM attachment a LEFT JOIN submission_attachment sa ON a.attachment_id = sa.attachment_id WHERE sa.submission_id = (SELECT submission_id FROM submission WHERE assignment_id = ? AND users_id = ? ORDER BY DATE_CREATED DESC LIMIT 1)';
            var params = [req.body.assignment_id, req.body.user_id];
            
            dao.query(sql, params, function(data){
                console.log(data)
                res.json(data);
            })
        }
        
    });


    app.post('/api/admin/discussion', function (req, res) {
        if (req.body.cid == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM discussion d LEFT JOIN users u on u.users_id = d.users_id WHERE d.course_class_id = ?';
            var params = [req.body.cid];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
    });

    app.post('/api/admin/discussion/detail', function (req, res) { 
        if (req.body.discussion_id == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM message m LEFT JOIN users u on m.users_id = u.users_id WHERE m.discussion_id = ? ORDER BY m.date_created DESC';
            var params = [req.body.discussion_id];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });

    app.post('/api/admin/gradebook', function (req, res) { 
        if (req.body.cid == null || req.body.user == null) {
            res.send({});
        } else {
            var sql = 'SELECT * FROM gradebook g LEFT JOIN gradebook_item gi on g.gradebook_item_id = gi.gradebook_item_id WHERE g.users_id = ? AND gi.course_class_id = ?;';
            var params = [req.body.user, req.body.cid];
            
            dao.query(sql, params, function(data){
                res.json(data);
            })
        }
        
    });



};
