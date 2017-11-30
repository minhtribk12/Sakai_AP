var fs = require('fs');
var config = require(__base + 'config/local_config');

module.exports = function (app) {
    app.post('/api/config/get_config', function (req, res) {
        fs.readFile(config.config_path, function (err, data) {
            if (err) {
                res.json({});
            } else {
                res.json(JSON.parse(data));
            }
        });
    });
};