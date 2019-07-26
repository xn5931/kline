'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _dbhelper = require('./dbhelper');

var _dbhelper2 = _interopRequireDefault(_dbhelper);

var _date = require('../lib/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql');

var connection = mysql.createConnection({

	host: '127.0.0.1',

	user: 'root',

	password: '123456',

	port: '3306',

	database: 'im_k_data'

});
//插入一条记录
module.exports.insertOne = function (options, resData, cb) {

	var nowTime = new Date(); //时间
	var nowTimeStamp = new Date().getTime(); //当前时间戳
	nowTimeStamp = _date2.default.ymd(nowTimeStamp); //年月日
	var collection = options.ex + '_symbol_latest'; //表
	var obj = { 'whereObj': 'TIMESTAMP' }; //查询条件 'whereObj':'max(x) as x'

	function check() {
		//查询数据库是否有数据

		var p = new Promise(function (resolve, reject) {

			_dbhelper2.default.find(collection, obj, function (mas, err) {
				//查询数据库最新的一条数据

				if (!err && mas || mas === null) {

					if (mas === null || mas.length === 0) {
						//数据库为空

						var data = { db: 'insert' }; //插入数据
						resolve(data); //>>>
					} else {

						var data = { db: 'update' }; //更新数据
						resolve(data); //>>>
					}
				} else {
					console.log("查询报错", err);
				}
			});
		});
		return p;
	}
	function insert(data) {
		//空表 - - 插入数据

		var p = new Promise(function (resolve, reject) {

			var value_arr = [];
			/* 
               数据库表中所需插入的数据
               ID - - 自增 ok
               COINNAME - - 币名 symbol（前）
               PRICE - - 当前价 close
               HIGHT - - 最高价 high
               LOW - - 最低价 low
               VOL - - 成交量 vol
               RATE_PERCENT - - 涨跌幅百分比 （open-close）/open 保留小数点后一位（10.1%）
               SYMBOL_TYPE - - 交易对类型(usdt,btc,eth...) symbol（后）
               TIMESTAMP - - 时间戳 ok
           */

			resData.map(function (val, index) {
				//遍历最新数据

				var value = '(' + val.id + ',"' + val.coinname + '","' + val.price + '","' + val.hight + '","' + val.low + '","' + val.vol + '","' + val.rate_percent + '","' + val.symbol_type + '","' + nowTimeStamp + '")'; //拼接获取的数据

				value_arr.push(value); //遍历出来的数据添加到数组
			});

			var value_str = value_arr.toString(); //数组转字符串

			var sql = 'INSERT INTO ' + collection + '(ID,COINNAME,PRICE,HIGHT,LOW,VOL,RATE_PERCENT,SYMBOL_TYPE,TIMESTAMP) VALUES' + value_str + ';';

			//插入k线数据
			connection.query(sql, function (err, result) {

				if (err) {

					console.log('[insertERROR] ', err);

					return;
				} else {

					console.log('>>>>>>>>插入k线 Success');
				}
			});
		});

		return p;
	}
	function update() {
		//更新数据

		var p = new Promise(function (resolve, reject) {

			var collection = options.ex + '_symbol_latest';

			//var whereObjAll = [{dbkey:"price"},{dbkey:"hight"},{dbkey:"low"},{dbkey:"vol"},{dbkey:"rate_percent"},{dbkey:"timestamp"}];

			//拼接limitStr>>>start
			var limitArrPrice = []; //Price
			var limitArrHight = []; //Hight
			var limitArrLow = []; //Low
			var limitArrVol = []; //Vol
			var limitArrRate_percent = []; //Rate_percent
			var limitArrTimestamp = []; //Timestamp
			var limitWhatArr = []; ////限制what(where id 后面的限制参数)--数组

			for (var j in resData) {

				var limitObjPrice = 'when ' + resData[j].id + ' then ' + resData[j].price + ' '; //拼接
				var limitObjHight = 'when ' + resData[j].id + ' then ' + resData[j].hight + ' '; //拼接
				var limitObjLow = 'when ' + resData[j].id + ' then ' + resData[j].low + ' '; //拼接
				var limitObjVol = 'when ' + resData[j].id + ' then ' + resData[j].vol + ' '; //拼接
				var limitObjRate_percent = 'when ' + resData[j].id + ' then ' + resData[j].rate_percent + ' '; //拼接
				var limitObjTimestamp = 'when ' + resData[j].id + ' then "' + nowTimeStamp + '" '; //拼接

				limitArrPrice.push(limitObjPrice); //Price
				limitArrHight.push(limitObjHight); //Hight
				limitArrLow.push(limitObjLow); //Low 
				limitArrVol.push(limitObjVol); //Vol
				limitArrRate_percent.push(limitObjRate_percent); //Rate_percent
				limitArrTimestamp.push(limitObjTimestamp); //Timestamp

				var limitWhat = resData[j].id + ','; //限制what(where id 后面的限制参数)--拼接
				limitWhatArr.push(limitWhat); //限制what(where id 后面的限制参数)
			}

			var limitStrPrice = limitArrPrice.join(''); //数组转字符串-Price
			var limitStrHight = limitArrHight.join(''); //数组转字符串-Hight
			var limitStrLow = limitArrLow.join(''); //数组转字符串-Low
			var limitStrVol = limitArrVol.join(''); //数组转字符串-Vol
			var limitStrRate_percent = limitArrRate_percent.join(''); //数组转字符串-Rate_percent
			var limitStrTimestamp = limitArrTimestamp.join(''); //数组转字符串-Timestamp

			//console.log("limitArr>>>>>",limitStr);
			var limitWhatStr = limitWhatArr.join(''); //数组转字符串

			limitWhatStr = limitWhatStr.substring(0, limitWhatStr.length - 1); //删除字符串最后一位
			//console.log("limitWhatStr>>>>>",limitWhatStr);
			//拼接limitStr>>>end

			var sql = 'update ' + collection + ' set price = case id ' + limitStrPrice + ' end,hight = case id ' + limitStrHight + ' end,low = case id ' + limitStrLow + ' end,vol = case id ' + limitStrVol + ' end,rate_percent = case id ' + limitStrRate_percent + ' end,timestamp = case id ' + limitStrTimestamp + ' end where id in(' + limitWhatStr + ')';

			//update bian1 set bian2 =case id bian3 end where id in(bian4);
			//bian1 collection --ok
			//bian2 price
			//bian3 when 470 then '666'
			//bian4 470,469
			//update +collection+ set +upObj+ +limitObj+ end where +skipObj+ in (skipObjWhat);
			//示例-根据id更新>>update huobi_symbol_latest set price = case id when 470 then '666' when 469 then '777' end where id in(470,469);

			_dbhelper2.default.updateMany(sql, function (err, result) {
				if (result) {

					console.log('>>>>>>update symbol Success');
					//重新插入最新数据
				} else {

					console.log('>>>>>>update symbol err', err);
				}

				//res.json({'res_code':'0000','describe':'Success,Consistency between database data and exchange data'});
			});
		});

		return p;
	}

	check().then(function (data) {

		if (data.db === 'insert') {
			return insert();
		}; //插入

		if (data.db === 'update') {
			return update();
		}; //更新
	}).then(function (data) {

		return Test3(data);
	});

	return 0;
};

module.exports.findData = function (options, resData, cb) {};
//# sourceMappingURL=symbol.js.map