var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var dbUtils = require('../utils/dbUtils');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(dbUtils.extend({}, mysqlConf.mysql));

module.exports = {
    add: function (user, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(userSqlMap.add, [user.username, user.password], function (err, result) {
                callback(result.affectedRows > 0);
                connection.release();
            });
        });
    },

    list: function (callback) {
        pool.getConnection(function (err, connection) {
            connection.query(userSqlMap.list, function (err, result) {
                callback(result);
                connection.release();
            });
        });
    }
};
