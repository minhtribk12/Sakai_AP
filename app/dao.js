var mysql = require('mysql');
var db = require(__base + 'config/database');
var config = require(__base + 'config/local_config');

exports.query = function(queryString, params, callback) {
    var pool = mysql.createPool(db);
    pool.getConnection(function(err, connection) {
        if (err) {
            pool.end();
            callback({});
            console.log({ "code": err.code, "status": err.message });
            return;
        } else {

            connection.query(queryString, params, function(err, rows) {
                if (err) { console.log(err) }
                connection.destroy();
                pool.end();
                callback(rows);
            });
        }
    });
};