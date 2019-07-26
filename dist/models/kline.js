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
//插入一条记录 - - pass
module.exports.addKline = function (resData, cb) {

	var collection = 'k_' + resData[0].ex + '_' + resData[0].currency + '_' + resData[0].period; //查表
	var obj = { 'whereObj': 'max(id) as mid' }; //查询条件

	//查询数据库最新的一条数据 - - 和ex最新的k线数据做对比
	function findMas() {

		var p = new Promise(function (resolve, reject) {

			_dbhelper2.default.find(collection, obj, function (mas, err) {
				//查询数据库最新的一条数据//console.log("mas.......1",mas[0].mid);

				if (!err) {

					if (mas[0].mid === null) {
						//数据库为空

						var dbNewmas = 0;
						var count = 100; //数据库为空 - -插入100条
						var data = { 'count': count, 'type': 'insert' }; //只执行插入
						resolve(data); //插入
					} else {
						//数据不为空

						var _dbNewmas = mas[0].mid; //数据库最新的一条数据 - - 时间戳
						var exNewmas = resData[0].id; //当前交易所最新的一条数据 - - 时间戳
						var kType = resData[0].period; //k线类型 - - 5min 15min ...console.log("mmm",exNewmas,dbNewmas);

						var count = 0; //ex和db相差的数量
						if (kType == '5min') {
							count = parseInt((exNewmas - _dbNewmas) / 300);
						}
						if (kType == '15min') {
							count = parseInt((exNewmas - _dbNewmas) / 900);
						}
						if (kType == '30min') {
							count = parseInt((exNewmas - _dbNewmas) / 1800);
						}
						if (kType == '60min') {
							count = parseInt((exNewmas - _dbNewmas) / 3600);
						}
						//if (kType == '1day'){ count = parseInt(( exNewmas - dbNewmas ) / 86400) ; }

						//let data ={'dbNewmas':dbNewmas,'exNewmas':exNewmas,'collection':collection,'klineTimeType':klineTimeType};
						if (count === 0) {

							var data = { 'count': count, 'type': 'update' };
							resolve(data); //更新
						} else if (count > 0) {
							//插入+更新

							var data = { 'count': count, 'type': 'insertUpdate' };
							resolve(data); //先更新再插入
						} else {

							console.log(" ERROR - - count", count);
							return; //退出
						}
					}
				} else {
					console.log("err...", err);
				}
			});
		});
		return p;
	}

	//对比数据库数据和交易所数据 - - 生成需要插入最新k线的数据包
	function updateKline() {

		//count == 0数据库数据和交易所id保持一致- - 更新最新一条信息//console.log("当前数据最新- - - - -数据库数据和交易所数据保持一致");
		var upObj = ' open = ' + resData[0].open + ',close = ' + resData[0].close + ',low = ' + resData[0].low + ',high = ' + resData[0].high + ',update_time = ' + resData[0].update_time + ',vol = ' + resData[0].vol;

		var key = 'id'; //根据id更新
		var value = resData[0].id; //更新的数据

		_dbhelper2.default.updateOneByKey(collection, key, value, upObj, function (err, result) {
			//执行更新最新一条

			if (result) {
				console.log("k 更新成功");cb({ 'res_code': '0000' });
			} //更新成功
		});

		return; //！！！
	}

	//插入mysql最新k线数据
	function insertKline(data) {

		var arr = resData; //最新ex的k线数据
		var arr2 = [];
		var updateArr = [];
		var count = data.count; //相差数量
		var insertCount = data.count - 1; //插入数量

		for (var i = 0; i <= count; i++) {
			//筛选本交易所最新k线数据
			if (i < count) {
				arr2.push(arr[i]);
			}
			if (i == count) {
				updateArr.push(arr[i]);
			} //更新 - - 插入的n条的前面一条
		}
		var addKlineSql_value_arr = []; //遍历出来的数据添加到数组
		arr2.map(function (val, index) {
			//遍历最新数据
			var addKlineSql_value = '(' + val.id + ',' + val.open + ',' + val.close + ',' + val.low + ',' + val.high + ',' + val.vol + ',' + val.update_time + ')'; //拼接获取的数据
			addKlineSql_value_arr.push(addKlineSql_value); //遍历出来的数据添加到数组
		});

		var addKlineSql_value_str = addKlineSql_value_arr.toString(); //数组转字符串 继续执行拼接后的values
		//id-时间戳timestamp(这条k线是身份时间戳) open-开盘价 close-收盘价 low-最低点 high-最高点 vol-成交量 update_time-更新时间(年月日)
		var addKlineSql = 'INSERT INTO ' + collection + '(id,open,close,low,high,vol,update_time) VALUES' + addKlineSql_value_str + ';';
		//插入k线数据
		//console.log("addKlineSqladdKlineSqladdKlineSql2",addKlineSql);
		connection.query(addKlineSql, function (err, result) {

			if (err) {
				//err.message
				console.log('[INSERT ERROR] - ', err);
				return;
			} else {
				//>>>insert
				if (data.type === 'insert') {
					console.log('>>>>>>>>insert k Success');return;
				}
				//>>>insertUpdate
				if (data.type === 'insertUpdate') {

					var id = updateArr[0].id; //更新插入信息的前面一条
					//id-时间戳timestamp(这条k线是身份时间戳) open-开盘价 close-收盘价 low-最低点 high-最高点 vol-成交量 update_time-更新时间(年月日)
					var upObj = ' open = ' + updateArr[0].open + ',close = ' + updateArr[0].close + ',low = ' + updateArr[0].low + ',high = ' + updateArr[0].high + ',vol = ' + updateArr[0].vol + ',update_time = ' + updateArr[0].update_time;

					_dbhelper2.default.updateOneById(collection, id, upObj, function (err, result) {
						//新的k线生成,避免时间差出现k线数据误差更新倒数第二条信息

						if (!err) {
							console.log('>>>>>>>insertUpdate k Success');cb({ 'res_code': '0000' });
						} else {
							console.log(err);
						}
					});
				}
			}
		});
	}

	//>>>执行
	findMas().then(function (data) {
		if (data.type === 'update') {
			return updateKline();
		}
		if (data.type === 'insert') {
			return insertKline(data);
		}
		if (data.type === 'insertUpdate') {
			return insertKline(data);
		}
	});
};
//# sourceMappingURL=kline.js.map