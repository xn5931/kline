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

module.exports.addListLatest = function (rData, cb) {

	var resData = rData.data;
	var collection = 'coinmarketcap_listings_latest'; //查表
	var obj = { 'whereObj': 'max(id) as mid' }; //查询条件
	var timestamp = rData.status.timestamp;
	var timestamp_new = _date2.default.UTC8ymd(timestamp);
	timestamp = _date2.default.ymd(timestamp_new); //状态的时间戳


	//对比数据库数据和coinmarketcap数据 
	function find() {

		var p = new Promise(function (resolve, reject) {
			_dbhelper2.default.find(collection, obj, function (mas, err) {
				//查询数据库最新的一条数据

				if (!err) {

					if (mas[0].mid === null) {
						//数据库为空

						var data = { 'type': 'insert' };
						resolve(data); //插入
					} else {
						//数据不为空

						var data = { 'type': 'update' };
						resolve(data); //更新
					}
				} else {
					console.log("err...", err);
				}
			});
		});
		return p;
	}

	//插入
	//市值 价格 换手率 24h成交量(USD) 24H涨跌幅 24H涨跌幅 7D涨跌幅
	function insert() {

		var addSql_value_arr = [];

		try {
			var count = -1;
			for (var i in resData) {
				//遍历最新数据

				count++;
				if (count == 200) {
					break;
				} //限制条数

				var last_updated_new = _date2.default.UTC8ymd(resData[count].last_updated);
				var last_updated_main = _date2.default.ymd(last_updated_new); //货币对主体更新时间 - 转换成东八区
				var usd_last_updated_new = _date2.default.UTC8ymd(resData[count].quote.USD.last_updated);
				var last_updated_usd = _date2.default.ymd(usd_last_updated_new); //usd的更新时间 - 转换成东八区
				var btc_last_updated_new = _date2.default.UTC8ymd(resData[count].quote.USD.last_updated);
				var last_updated_btc = _date2.default.ymd(btc_last_updated_new); //btc的更新时间 - 转换成东八区

				var usd_volume_24h = parseInt(resData[count].quote.USD.volume_24h); //24交易额
				var cny_volume_24h = parseInt(resData[count].quote.USD.volume_24h * 7); //24交易额
				var usd_market_cap = parseInt(resData[count].quote.USD.market_cap); //总市值
				var cny_market_cap = parseInt(resData[count].quote.USD.market_cap * 7); //总市值
				var turnover = usd_volume_24h / usd_market_cap * 100; //换手率
				turnover = turnover.toFixed(2); //保留小数点后2位
				usd_market_cap = (usd_market_cap / 100000000).toFixed(2); //亿美元 市值 保留小数点后2位
				usd_volume_24h = (usd_volume_24h / 100000000).toFixed(2); //亿美元 24交易额 保留小数点后2位

				var price = resData[count].quote.USD.price.toFixed(4); //price 保留小数点后4位
				var cnyPrice = (resData[count].quote.USD.price * 7).toFixed(2); //price 保留小数点后4位

				var usd_percent_change_1h = resData[count].quote.USD.percent_change_1h.toFixed(2);; //1h
				var usd_percent_change_24h = resData[count].quote.USD.percent_change_24h.toFixed(2);; //24h
				var usd_percent_change_7d = resData[count].quote.USD.percent_change_7d.toFixed(2);; //7d

				var addSql_value = '(' + resData[count].id + ',"' + resData[count].name + '","' + resData[count].symbol + '","' + resData[count].slug + '","' + turnover + '","' + resData[count].circulating_supply + '","' + resData[count].total_supply + '","' + resData[count].max_supply + '","' + last_updated_main + '","' + price + '","' + usd_volume_24h + '","' + usd_percent_change_1h + '","' + usd_percent_change_24h + '","' + usd_percent_change_7d + '","' + usd_market_cap + '","' + last_updated_usd + '","' + resData[count].quote.USD.price + '","' + resData[count].quote.USD.change_1h + '","' + resData[count].quote.USD.percent_change_24h + '","' + resData[count].quote.USD.percent_change_7d + '","' + resData[count].quote.USD.market_cap + '","' + last_updated_btc + '","' + timestamp + '")'; //拼接获取的数据
				addSql_value_arr.push(addSql_value); //遍历出来的数据添加到数组
			}
			// resData.map((val,index)=>{//遍历最新数据

			// 		var last_updated_new = date.UTC8ymd(val.last_updated);
			// 		var last_updated_main = date.ymd(last_updated_new);//货币对主体更新时间 - 转换成东八区

			// 		var usd_last_updated_new = date.UTC8ymd(val.quote.USD.last_updated);
			// 		var last_updated_usd = date.ymd(usd_last_updated_new);//usd的更新时间 - 转换成东八区

			// 		var btc_last_updated_new = date.UTC8ymd(val.quote.USD.last_updated);
			// 		var last_updated_btc = date.ymd(btc_last_updated_new);//btc的更新时间 - 转换成东八区

			// 		var addSql_value = '('+val.id+',"'+val.name+'","'+val.symbol+'","'+val.slug+'","'+val.circulating_supply+'","'+val.total_supply+'","'+val.max_supply+'","'+last_updated_main+'","'+val.quote.USD.price+'","'+val.quote.USD.volume_24h+'","'+val.quote.USD.percent_change_1h+'","'+val.quote.USD.percent_change_24h+'","'+val.quote.USD.percent_change_7d+'","'+val.quote.USD.market_cap+'","'+last_updated_usd+'","'+val.quote.USD.price+'","'+val.quote.USD.change_1h+'","'+val.quote.USD.percent_change_24h+'","'+val.quote.USD.percent_change_7d+'","'+val.quote.USD.market_cap+'","'+last_updated_btc+'","'+timestamp
			// 		+'")';//拼接获取的数据
			// 		addSql_value_arr.push(addSql_value);//遍历出来的数据添加到数组
			// })
		} catch (e) {
			console.log("catch", e);
		}
		var addSql_value_str = addSql_value_arr.toString(); //数组转字符串 继续执行拼接后的values

		//id(标示)name(名字) symbol(交易对)slug(全称)circulating_supply(当前供应量) total_supply(总供应量) max_supply(最大供应量) last_updated(更新时间) usd_price(美元价格) usd_volume_24h(美元24小时成交量),usd_percent_change_1h(美元报价1小时涨跌幅) usd_percent_change_24h(美元报价24小时涨跌幅) usd_percent_change_7d(美元报价7天涨跌幅)  usd_market_cap(美元报价交易量), usd_last_updated (美元报价数据更新时间), btc_price(btc报价的价格), btc_change_1h(btc统计的1h成交量),btc_percent_change_24h(btc报价的24小时涨跌幅),btc_percent_change_7d(btc报价的7天涨跌幅),btc_market_cap(btc报价统计的成交量),btc_last_updated(btc报价的统计时间),status_timestamp
		var addSql = 'INSERT INTO ' + collection + '(id,name,symbol,slug,turnover,circulating_supply,total_supply,max_supply,last_updated,usd_price,usd_volume_24h,usd_percent_change_1h,usd_percent_change_24h,usd_percent_change_7d,usd_market_cap,usd_last_updated,btc_price,btc_change_1h,btc_percent_change_24h,btc_percent_change_7d,btc_market_cap,btc_last_updated,status_timestamp) VALUES' + addSql_value_str + ';';
		//插入
		connection.query(addSql, function (err, result) {

			if (err) {
				console.log('[INSERT ERROR] - ', err);
				return;
			} else {
				//>>>insert
				console.log('>>>>>>>>insert addSql Success');
				var msg = { insert: result };
				cb(msg);
			}
		});
	}
	//更新
	function update() {

		var obj = { whereObj: 'id>0' };
		_dbhelper2.default.deleteMany(collection, obj, function (err, result) {
			if (!err) {
				if (result) {
					insert();
				} //清空后插入
			} else {
				console.log(err);
			}
		});
		return; //！！！
	}

	//>>>执行
	find().then(function (data) {
		if (data.type === 'insert') {
			return insert();
		}
		if (data.type === 'update') {
			return update();
		}
	});
};
//# sourceMappingURL=coinmarketcap.js.map