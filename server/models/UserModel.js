var pool = require("./db").pool;

function UserModel() {
    if(!(this instanceof MainModel)) {
        return new MainModel();
    }
}

UserModel.prototype.select = function(paramMap, callback) {
    var query = "SELECT * FROM test";
    callback([]);

    //pool.query(query, function(err, rows, fields) {
    //    if (err) {
    //        throw err;
    //    }
    //
    //    console.log('Result: ', rows);
    //
    //    callback(rows);
    //});
};

UserModel.prototype.insert = function(paramMap, callback) {
    
};

UserModel.prototype.update = function(paramMap, callback) {

};

UserModel.prototype.remove = function(paramMap, callback) {

};


module.exports = UserModel;


