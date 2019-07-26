'use strict';

var mysql = require('mysql');
var kline_type = require('../../kline_type'); //表类型json数据包

var connection = mysql.createConnection({

    host: '127.0.0.1',

    user: 'root',

    password: '123456',

    port: '3306',

    database: 'im_k_data'

});

//创建四大交易所的k线数据表
var buildAllTable = function buildAllTable(cb) {

    console.log("buildAllTable>>>>>>>>>>>>>>>>start");
    kline_type.kline_type(function (options) {

        options.map(function (val, index) {
            //遍历最新数据

            var tableName = "k_" + val.ex + "_" + val.currency + "_" + val.period;
            var usql = "CREATE TABLE " + tableName + "(ID int(255),OPEN varchar(255), CLOSE varchar(255),LOW varchar(255),HIGH varchar(255),VOL varchar(255),UPDATE_TIME varchar(255))";

            connection.query(usql, function (err, result) {

                if (err) {

                    if (err && err.errno == 1050) {
                        console.log(tableName + "表已经存在");
                    } else {
                        console.log(err);
                    }
                    return;
                } else {

                    console.log(tableName + "创建成功");
                }
            });
        });
    });
};

//创建实时数据缓存表
var buildLatestTable = function buildLatestTable(options) {

    options.map(function (val, index) {
        //遍历最新数据        
        //ID - - 时间戳 k线的身份标识
        //COINNAME - - 币名
        //PRICE - - 当前价
        //HIGHT - - 最高价99
        //LOW - - 最低价
        //VOL - - 成交量(btc)
        //RATE_PERCENT - - 波动百分比
        //SYMBOL_TYPE - - 交易对类型(usdt,btc,eth...)
        //TIMESTAMP - - 时间戳
        var tableName = val.ex + "_symbol_latest";
        var usql = "CREATE TABLE " + tableName + "(ID int(255),COINNAME varchar(255),PRICE varchar(255),HIGHT varchar(255),LOW varchar(255),VOL varchar(255), RATE_PERCENT varchar(255),SYMBOL_TYPE varchar(255),TIMESTAMP varchar(255))";

        connection.query(usql, function (err, result) {
            if (err) {

                if (err.errno == 1050) {
                    console.log(tableName + "表已经存在");
                }
                return;
            } else {

                console.log(tableName + "创建成功");
            }
        });
    });
};

var options = [{ ex: 'huobi' }, { ex: 'binance' }, { ex: 'gate' }, { ex: 'okex' }];

//清空所有数据表格的数据
var dropTableData = function dropTableData(cb) {

    console.log("清空所有数据表格的数据>>>>>>>>>>>>>>>>>>start");
    kline_type.kline_type(function (res) {

        res.map(function (val, index) {
            //遍历最新数据

            var tableName = "k_" + val.ex + "_" + val.currency + "_" + val.period;
            var usql = "truncate TABLE " + tableName;

            connection.query(usql, function (err, result) {

                if (err) {

                    if (err) {
                        console.log(tableName + "表err" + err);
                    }
                    return;
                } else {

                    console.log(tableName + "清空成功");
                }
            });
        });
    });
};

//清空所有数据表格的数据
var bookkeepingTable = function bookkeepingTable(cb) {

    console.log("流水账 表格>>>>>>>>>>>>>>>>>>start");
    var tableName = "monitor_bookkeeping";
    var usql = "truncate TABLE " + tableName;

    connection.query(usql, function (err, result) {

        if (err) {

            if (err) {
                console.log(tableName + "表err" + err);
            }
            return;
        } else {

            console.log(tableName + "清空成功");
        }
    });

    var tableName = "monitor_bookkeeping";

    var usql = "CREATE TABLE " + tableName + "(ID int(255),START_TIME varchar(255),VALID_TIME varchar(255),EX varchar(255),CURRENCY varchar(255),PERIOD varchar(255),PRICE varchar(255),RATE_PERCENT varchar(255),TYPE varchar(255))";
    console.log(usql);
    connection.query(usql, function (err, result) {

        if (err) {

            if (err.errno == 1050) {
                console.log(tableName + "表已经存在");
            }
            return;
        } else {

            console.log(tableName + "创建成功");
        }
    });
};

//coinmarketcap -(listings-latest)
var coinmarketcapListLatest = function coinmarketcapListLatest(cb) {

    var tableName = "coinmarketcap_listings_latest";
    var usql = "truncate TABLE " + tableName;
    console.log("coinmarketcap table>>>>>>>>>>>>>>>>>>start");

    connection.query(usql, function (err, result) {

        if (err) {

            console.log(tableName + "表err" + err);
            return;
        } else {
            console.log(tableName + "清空成功");
        }
    });

    //id(标示)name(名字) symbol(交易对)slug(全称)turnover(换手率)circulating_supply(当前供应量) total_supply(总供应量) max_supply(最大供应量) last_updated(更新时间) usd_price(美元价格) usd_volume_24h(美元24小时成交量),usd_percent_change_1h(美元报价1小时涨跌幅) usd_percent_change_24h(美元报价24小时涨跌幅) usd_percent_change_7d(美元报价7天涨跌幅)  usd_market_cap(美元报价交易量), usd_last_updated (美元报价数据更新时间), btc_price(btc报价的价格), btc_change_1h(btc统计的1h成交量),btc_percent_change_24h(btc报价的24小时涨跌幅),btc_percent_change_7d(btc报价的7天涨跌幅),btc_market_cap(btc报价统计的成交量),btc_last_updated(btc报价的统计时间),status_timestamp
    var usql = "CREATE TABLE " + tableName + "(id int(255),name varchar(255),symbol varchar(255),slug varchar(255),turnover varchar(255),circulating_supply varchar(255),total_supply varchar(255),max_supply varchar(255), last_updated varchar(255), usd_price varchar(255), usd_volume_24h varchar(255),usd_percent_change_1h varchar(255), usd_percent_change_24h varchar(255),usd_percent_change_7d varchar(255), usd_market_cap varchar(255), usd_last_updated varchar(255),cny_price varchar(255), cny_volume_24h varchar(255),cny_market_cap varchar(255),btc_price varchar(255), btc_change_1h varchar(255),btc_percent_change_24h varchar(255),btc_percent_change_7d varchar(255),btc_market_cap varchar(255),btc_last_updated varchar(255),status_timestamp varchar(255))";

    connection.query(usql, function (err, result) {

        if (err) {

            if (err.errno == 1050) {
                console.log(tableName + "表已经存在");
            }
            return;
        } else {

            console.log(tableName + "创建成功");
        }
    });
};
dropTableData(); //执行>>>清空所有表格数据
buildAllTable(); //执行>>>创建四大交易所的k线数据表格
buildLatestTable(options); //执行>>>创建实时数据缓存表
bookkeepingTable(); //执行>>>异常波动流水表格
coinmarketcapListLatest(); //执行>>>coinmarketcap表格
//# sourceMappingURL=auto_table_build.js.map