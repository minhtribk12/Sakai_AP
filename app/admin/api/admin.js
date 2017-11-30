var dao = require(__base + 'app/dao');

module.exports = function (app) {
    app.post('/api/admin/login', function (req, res) {
        var sql = 'SELECT users_id, name, email FROM users WHERE users_id = ? AND password = ?';
        var params = [req.body.username, req.body.passwd];
        dao.query(sql, params, function(data){
            res.json(data);
        })
    });

    
};
