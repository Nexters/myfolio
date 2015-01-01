var mysql      = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'dev',
    password        : 'qwert123',
    database: 'myfolio'
});

module.exports = {
    mysql: mysql,
    pool: pool
};