var pool = require("./db").pool;

function MainModel() {
    if(!(this instanceof MainModel)) {
        return new MainModel();
    }
}

MainModel.prototype.select = function(paramMap, callback) {
    var query = "SELECT * FROM test";
    pool.query(query, function(err, rows, fields) {
        if (err) {
            throw err;
        }

        console.log('Result: ', rows);
        callback({});
    });
};

MainModel.prototype.insert = function(paramMap, callback) {

};

MainModel.prototype.update = function(paramMap, callback) {

};

MainModel.prototype.remove = function(paramMap, callback) {

};


module.exports = MainModel;


