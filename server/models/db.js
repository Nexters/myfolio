var mysql      = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'gd0105',
    database: 'myfolio'
});

module.exports = {
    pool: pool
};