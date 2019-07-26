'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _dbhelper = require('./dbhelper');

var _dbhelper2 = _interopRequireDefault(_dbhelper);

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
//插入一条记录
module.exports.insertOneLatest = function (body, req, res, cb) {

	//console.log("req....query",req.query.ex);//huobi
	//console.log("req....query",req.query.currency);//btcusdt
	//console.log("req....query",req.query.time);//k线_分钟线 -- 1min

	//var collection = 'k_huobi_btcusdt_1min';//查表
	var collection = 'k_' + req.query.ex + '_' + req.query.currency + '_' + req.query.time; //查表

	var obj = { 'whereObj': 'max(id) as mid' }; //查询条件

	function findNewKlineId() {
		//查询数据库最新的一条数据

		var p = new Promise(function (resolve, reject) {

			_dbhelper2.default.find(collection, obj, function (mas, err) {
				//查询数据库最新的一条数据

				console.log("mas.......", mas);

				if (!err && mas || mas === null) {

					//console.log("mas.......",mas);

					//console.log('body.data[0].id........1111111',body.data[0].id);

					var dbNewmas = mas; //数据库最新的一条数据

					var exNewmas = body.data[0].id; //当前交易所最新的一条数据

					var klineTimeType = req.query.time; //k线类型

					if (mas === null) {
						dbNewmas = 0;
					} //数据库为空

					var data = { 'dbNewmas': dbNewmas, 'exNewmas': exNewmas, 'collection': collection, 'klineTimeType': klineTimeType };

					resolve(data);
				} else {

					res.json({ 'res_code': '01040001', 'describe': err }); //查询max(id)报错
				}
			});
		});

		return p;
	}
	function fnAddKlineSql_value(data) {
		//对比数据库数据和交易所数据 - - 生成需要插入最新k线的数据包 - - data里面包含 data.exNewmas && data.dbNewmas

		var p = new Promise(function (resolve, reject) {

			//console.log('fnAddKlineSql_value',data);
			//klineTimeType--k线时间类型 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
			//数据库和交易所数据相差数量
			if (data.klineTimeType == '1min') {
				var count = (data.exNewmas - data.dbNewmas) / 60;
			}
			if (data.klineTimeType == '5min') {
				var count = (data.exNewmas - data.dbNewmas) / 300;
			}
			if (data.klineTimeType == '15min') {
				var count = (data.exNewmas - data.dbNewmas) / 900;
			}
			if (data.klineTimeType == '30min') {
				var count = (data.exNewmas - data.dbNewmas) / 1800;
			}
			if (data.klineTimeType == '60min') {
				var count = (data.exNewmas - data.dbNewmas) / 3600;
			}
			if (data.klineTimeType == '1day') {
				var count = (data.exNewmas - data.dbNewmas) / 86400;
			}
			if (data.klineTimeType == '1mon') {
				var count = (data.exNewmas - data.dbNewmas) / 2592000;
			} //?
			if (data.klineTimeType == '1week') {
				var count = (data.exNewmas - data.dbNewmas) / 604800;
			}
			if (data.klineTimeType == '1year') {
				var count = (data.exNewmas - data.dbNewmas) / 31536000;
			} //?

			if (data.dbNewmas == 0) {
				count = 10;
			};

			//console.log('数据库和交易所数据相差数量- && -数据库当前条数',count,data.dbNewmas);

			if (count == 0) {
				//数据库数据和交易所id保持一致- - 更新最新一条信息

				//console.log("当前数据最新- - - - -数据库数据和交易所数据保持一致");

				var _collection = data.collection;

				var id = data.exNewmas;

				var upObj = ' open = ' + body.data[0].open + ',close = ' + body.data[0].close + ',low = ' + body.data[0].low + ',high = ' + body.data[0].high + ',amount = ' + body.data[0].amount + ',vol = ' + body.data[0].vol + ',count = ' + body.data[0].count;

				_dbhelper2.default.updateOneById(_collection, id, upObj, function (err, result) {
					//执行更新最新一条
					//console.log("....001001",err,result);
					cb({ 'res_code': '0000' });
					//res.json({'res_code':'0000','describe':'Success,Consistency between database data and exchange data'});
				});

				return; //！！！
			} else {
				var arr = body.data; //最新k线数据

				var arr2 = [];

				for (var i = 0; i < count; i++) {
					//筛选本交易所最新k线数据
					arr2.push(arr[i]);
				}
				//console.log("arr2arr2arr2arr2",arr2);
				var addKlineSql_value_arr = []; //遍历出来的数据添加到数组

				arr2.map(function (val, index) {
					//遍历最新数据

					var addKlineSql_value = '(' + val.id + ',' + val.open + ',' + val.close + ',' + val.low + ',' + val.high + ',' + val.amount + ',' + val.vol + ',' + val.count + ')'; //拼接获取的数据

					//console.log('addKlineSql_value...123',addKlineSql_value);//遍历出来的数据

					addKlineSql_value_arr.push(addKlineSql_value); //遍历出来的数据添加到数组
				});

				var addKlineSql_value_str = addKlineSql_value_arr.toString(); //数组转字符串

				var addKlineSql_value_data = { 'addKlineSql_value_str': addKlineSql_value_str, 'collection': collection };

				//console.log('aaaaaa33333',addKlineSql_value_str);
			}

			resolve(addKlineSql_value_data); //继续执行拼接后的values
		});

		return p;
	}
	function Test3(addKlineSql_value_data) {
		//插入mysql最新k线数据

		var p = new Promise(function (resolve, reject) {

			//console.log('Test3',addKlineSql_value_data.addKlineSql_value_str);//传入的数据

			var addKlineSql = 'INSERT INTO ' + addKlineSql_value_data.collection + '(id,open,close,low,high,amount,vol,count) VALUES' + addKlineSql_value_data.addKlineSql_value_str + ';';

			//console.log("sql.......",addKlineSql);

			//插入k线数据
			connection.query(addKlineSql, function (err, result) {

				if (err) {
					//err.message
					console.log('[INSERT ERROR] - ');
					return;
				}
				console.log('>>>>>>>>插入新k线 Success');
			});

			var Sql_value_data = { 'collection': addKlineSql_value_data.collection };
			resolve(Sql_value_data);
		});

		return p;
	}

	findNewKlineId().then(function (data) {
		//console.log("........000",data);
		console.log("........001");

		return fnAddKlineSql_value(data);
	}).then(function (data) {
		//console.log("........111",data);
		console.log("........002");

		return Test3(data);
	}).then(function (data) {
		//console.log("........222",data);
		console.log("........003");

		var collection = data.collection;

		var id = body.data[1].id;

		var upObj = ' open = ' + body.data[1].open + ',close = ' + body.data[1].close + ',low = ' + body.data[1].low + ',high = ' + body.data[1].high + ',amount = ' + body.data[1].amount + ',vol = ' + body.data[1].vol + ',count = ' + body.data[1].count;

		_dbhelper2.default.updateOneById(collection, id, upObj, function (err, result) {
			//新的k线生成,避免时间差出现k线数据误差更新倒数第二条信息

			//console.log("....001001",err,result);
			console.log('>>>>>>>>更新次新k线 Success');
			cb({ 'res_code': '0000' });
			//res.json({'res_code':'0000','describe':'Success,Consistency between database data and exchange data'});
		});
	});

	return 0;
};
//# sourceMappingURL=transactionPairList.js.map