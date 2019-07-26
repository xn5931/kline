'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql');

var klineController = require('../controllers/klineController');

var connection = mysql.createConnection({

    host: '127.0.0.1',

    user: 'root',

    password: '123456',

    port: '3306',

    database: 'im_k_data'

});
/*查找  - -pass
* collection：集合
* obj:
*   whereObj:条件，默认是{}
*   sortObj:排序，默认是{}
*   limit:显示提定条数,默认是0
*   skip:跳过指定条数，默认是0*/
module.exports.find = function (collection, obj, cb) {

    //如果有条件，将条件赋值给obj.whereObj,没有传条件默认为{}
    obj.whereObj = obj.whereObj || {};
    obj.sortObj = obj.sortObj || {};
    obj.limit = obj.limit || 0;
    obj.skip = obj.skip || 0;

    var usql = 'select ' + obj.whereObj + ' from ' + collection + ';';

    connection.query(usql, function (err, result) {

        if (err) {

            return cb('err dbhelp find', err);
        } else {

            return cb(result);
        }
    });
};

/* 查找一条记录*/ //- - pass 
module.exports.findOne = function (collection, obj, cb) {

    //如果有条件，将条件赋值给obj.whereObj,没有传条件默认为{}
    obj.whereObj = obj.whereObj || {};
    obj.sortObj = obj.sortObj || {};
    obj.limit = obj.limit || 0;
    obj.skip = obj.skip || 0;

    var usql = 'select ' + obj.whereObj + ' from ' + collection + ' where ' + obj.limit + ' = ' + obj.sortObj + ';';

    connection.query(usql, function (err, result) {
        if (err) {

            return cb('err dbhelp find', err);
        } else {

            return cb(result);
        }
    });
};
/***************************插入***************************/
//插入一条记录
// module.exports.insert=function(collection,obj,cb){

// var  addKlineSql = 'INSERT INTO k_huobi_usdt_btc_1min(id,open,close,low,high,amount,vol,count) VALUES(' + body.data[0].id + ',' + body.data[0].open + ','+ body.data[0].close + ','+ body.data[0].low + ','+ body.data[0].high + ','+ body.data[0].amount + ','+ body.data[0].vol + ','+ body.data[0].count + ');'
// //console.log("sql.......",addKlineSql);
// //插入k线数据
// connection.query(addKlineSql,function (err, result) {

//     if(err){
//         //err.message
//         console.log('[ ERROR] - ');
//         return;
//     }else{

//console.log(result);

//     } 
//     });      
// }
/***************************插入***************************/

/*****************************修改*******************************/
//根据ID修改一条记录
/*
    collection
    id
    upObj
    cb 回调函数
*/
// - - pass
module.exports.updateOneById = function (collection, id, upObj, cb) {

    var usql = 'update ' + collection + ' set' + upObj + ' where id = ' + id + ';';

    connection.query(usql, function (err, result) {

        if (err) {

            console.log("updateOneById - - err", err);
            return cb(err, result);
        } else {

            return cb(err, result);
        }
    });
};
// - - pass
module.exports.updateOneByKey = function (collection, key, value, upObj, cb) {
    //update k_huobi_usdt_btc_1min set open ='222' where id=1560477000;

    var usql = 'update ' + collection + ' set' + upObj + ' where ' + key + ' = ' + value + ';';

    //console.log("usql - - - updateOneById",usql);

    connection.query(usql, function (err, result) {

        if (err) {

            //console.log("usql - - - updateOneById",err);

            return cb('err dbhelp updateOneById', err);
        } else {

            //console.log(result)

            return cb(err, result);
        }
    });
};

//修改一条记录
module.exports.updateOne = function (collection, whereObj, upObj, cb) {
    _connect(function (db) {
        db.collection(collection).updateOne(whereObj, upObj, function (err, results) {
            cb(err, results);
        });
    });
};
//修改多条记录 - - pass
module.exports.updateMany = function (sql, cb) {

    //sql='UPDATE '+collection+' SET '
    connection.query(sql, function (err, result) {
        return cb(err, result);
    });
};
/*****************************修改*******************************/

/*****************************删除*******************************/
//修改多条记录 - - pass
module.exports.deleteMany = function (collection, obj, cb) {

    obj.whereObj = obj.whereObj || {};
    obj.sortObj = obj.sortObj || {};
    obj.limit = obj.limit || 0;
    obj.skip = obj.skip || 0;

    var sql = 'DELETE FROM ' + collection + ' WHERE ' + obj.whereObj + ';';

    connection.query(sql, function (err, result) {
        return cb(err, result);
    });
};

//删除一条记录
module.exports.deleteOne = function (collection, whereObj, cb) {
    _connect(function (db) {
        db.collection(collection).deleteOne(whereObj, function (err, results) {
            cb(err, results);
        });
    });
};
/*****************************删除*******************************/

//插入一条记录 - - pass
module.exports.insertOne = function (collection, whereObj, value, cb) {

    //var  addKlineSql = 'INSERT INTO k_huobi_usdt_btc_1min(id,open,close,low,high,amount,vol,count) VALUES(' + body.data[0].id + ',' + body.data[0].open + ','+ body.data[0].close + ','+ body.data[0].low + ','+ body.data[0].high + ','+ body.data[0].amount + ','+ body.data[0].vol + ','+ body.data[0].count + ');'
    var Sql = 'INSERT INTO ' + collection + '(' + whereObj + ') VALUES(' + value + ');';
    connection.query(Sql, function (err, result) {
        cb(err, result);
    });
};

//插入多条记录
/*
* collection:插入的集合，
* arr:插入的文档
* cb:回调函数。通过该函数返回执行的结果*/
module.exports.insertMany = function (collection, arr, cb) {
    _connect(function (db) {
        db.collection(collection).insertMany(arr, function (err, results) {
            cb(err, results);
        });
    });
};
/*********************查找**********************************/
//根据条件查找记录数
module.exports.count = function (collection, whereObj, cb) {
    _connect(function (db) {
        db.collection(collection).count(whereObj).then(function (count) {
            cb(count);
        });
    });
};

/*
* 查找一条记录*/
module.exports.dssdsde = function (collection, whereObj, cb) {
    _connect(function (db) {
        db.collection(collection).findOne(obj, function (err, results) {
            cb(err, results);
        });
    });
};
//根据ID来查找记录
module.exports.findOneById = function (collection, id, cb) {
    _connect(function (db) {
        db.collection(collection).findOne({ _id: mysql.ObjectId(id) }, function (err, results) {
            cb(err, results);
        });
    });
};

//根据ID来删除一条记录
module.exports.deleteOneById = function (collection, id, cb) {
    _connect(function (db) {
        db.collection(collection).deleteOne({ _id: mysql.ObjectId(id) }, function (err, results) {
            cb(err, results);
        });
    });
};
//删除一条记录
module.exports.deleteOne = function (collection, whereObj, cb) {
    _connect(function (db) {
        db.collection(collection).deleteOne(whereObj, function (err, results) {
            cb(err, results);
        });
    });
};
//# sourceMappingURL=dbhelper.js.map