'use strict';

var _kline = require('../models/kline');

var _kline2 = _interopRequireDefault(_kline);

var _getCoinTransactionPairListHelp = require('./help/getCoinTransactionPairListHelp');

var _getCoinTransactionPairListHelp2 = _interopRequireDefault(_getCoinTransactionPairListHelp);

var _date = require('../lib/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');


var app = {

    insertKlineData: function insertKlineData(req, res) {
        var ex = req.query.ex; //'huobi' - - 交易所
        var currency = req.query.currency; //btcusdt - - 交易对类型 
        var period = req.query.period; //5min - - 期间
        var size = 200; //每次请求的条数
        var nowTime = new Date(); //时间
        var nowTimeStamp = new Date().getTime(); //当前时间戳
        var nowTimeYmd = _date2.default.ymd(nowTimeStamp); //年月日

        //调用huobi-api接口获取k线数据
        function getHuobiKlineData(url) {
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //id-时间戳timestamp(这条k线是身份时间戳) open-开盘价 close-收盘价 low-最低点 high-最高点 vol-成交量 update_time-更新时间(年月日)
                    var updateResData = function updateResData() {
                        //更新交易所返回的数据(统一格式后提交给model)

                        var p = new Promise(function (resolve, reject) {
                            //做一些异步操作

                            for (var i in resData) {

                                //改
                                resData[i].open = resData[i].open;
                                resData[i].close = resData[i].close;
                                resData[i].low = resData[i].low;
                                resData[i].high = resData[i].high;
                                resData[i].vol = resData[i].vol;
                                //增
                                resData[i].ex = ex; //交易所
                                resData[i].currency = currency; //交易对
                                resData[i].period = period; //k线区间
                                resData[i].update_time = '"' + nowTimeYmd + '"'; //更新时间
                                // 删
                                delete resData[i].amount;
                                delete resData[i].count;
                            }
                            resolve(resData);
                        });
                        return p;
                    };

                    try {

                        var resData = JSON.parse(body); //将json字符串转换成json对象
                        resData = resData.data;
                    } catch (e) {

                        console.log("e", e);
                        return;
                    }
                    updateResData().then(function (data) {

                        var resData = data;
                        //获取到标准格式的k线数据resData
                        _kline2.default.addKline(resData, function (result) {
                            //console.log("获取到了执行结果>>>>>>>>>",result);

                            if (result && result.res_code === "0000") {

                                res.json({ 'res_code': '01' });
                            } else {

                                res.json({ 'res_code': '01030001' }, { 'describe': 'insertKline error' });
                            }
                        });
                    });
                } else {

                    if (!error && response.statusCode == 429) {
                        console.log("请求太频繁>>>>>>>");
                        res.send("'res_code':'01030000','describe':'请求太频繁>>>>>>>'");
                    } else {
                        console.log("error", error);
                        res.send("'res_code':'01030004'");
                    }
                    return;
                }
            });
        }

        //调用okex-api接口获取k线数据
        function getOkexKlineData(url) {

            request(url, function (error, response, body) {

                if (!error && response.statusCode == 200) {
                    //id-时间戳timestamp(这条k线是身份时间戳) open-开盘价 close-收盘价 low-最低点 high-最高点 vol-成交量 update_time-更新时间(年月日)
                    var updateResData = function updateResData() {
                        //更新交易所返回的数据(统一格式后提交给model)

                        var p = new Promise(function (resolve, reject) {
                            //做一些异步操作

                            for (var i in resData) {

                                var date = new Date(resData[i][0]);
                                var time = date.getTime();

                                //改
                                resData[i].id = time / 1000; //事间戳
                                resData[i].open = resData[i][1];
                                resData[i].high = resData[i][2];
                                resData[i].low = resData[i][3];
                                resData[i].close = resData[i][4];
                                resData[i].vol = resData[i][5];
                                //增
                                resData[i].ex = ex; //交易所
                                resData[i].currency = currency; //交易对
                                resData[i].period = period; //k线区间
                                resData[i].update_time = '"' + nowTimeYmd + '"'; //更新时间
                                // 删
                                delete resData[0][0];
                                delete resData[0][1];
                                delete resData[0][2];
                                delete resData[0][3];
                                delete resData[0][4];
                                delete resData[0][5];
                            }
                            resolve(resData);
                        });
                        return p;
                    };

                    try {

                        var resData = JSON.parse(body); //将json字符串转换成json对象     
                    } catch (e) {

                        console.log("e", e);
                        return;
                    }
                    updateResData().then(function (data) {
                        var resData = data; //console.log("取值>>>>>>>>",resData[0]) //取值test

                        //获取到标准格式的k线数据resData
                        _kline2.default.addKline(resData, function (result) {
                            //console.log("获取到了执行结果>>>>>>>>>",result);

                            if (result && result.res_code === "0000") {

                                res.json({ 'res_code': '01' });
                            } else {

                                res.json({ 'res_code': '01030001' }, { 'describe': 'insertKline error' });
                            }
                        });
                    });
                } else {
                    console.log(error, response, body);
                }
            });
        }

        //调用gate-api接口获取k线数据
        function getGateKlineData(url) {
            request(url, function (error, response, body) {

                if (!error) {

                    try {
                        //将json字符串转换成json对象
                        //id-时间戳timestamp(这条k线是身份时间戳) open-开盘价 close-收盘价 low-最低点 high-最高点 vol-成交量 update_time-更新时间(年月日)
                        var updateResData = function updateResData() {
                            //更新交易所返回的数据(统一格式后提交给model)

                            var p = new Promise(function (resolve, reject) {
                                //做一些异步操作

                                for (var i in resData) {

                                    //改
                                    resData[i].id = resData[i][0] / 1000; //时间戳
                                    resData[i].vol = resData[i][1]; //交易量
                                    resData[i].close = resData[i][2];
                                    resData[i].high = resData[i][3];
                                    resData[i].low = resData[i][4];
                                    resData[i].open = resData[i][5];

                                    //增
                                    resData[i].ex = ex; //交易所
                                    resData[i].currency = currency; //交易对
                                    resData[i].period = period; //k线区间
                                    resData[i].update_time = '"' + nowTimeYmd + '"'; //更新时间
                                    // 删
                                    delete resData[i][0];
                                    delete resData[i][1];
                                    delete resData[i][2];
                                    delete resData[i][3];
                                    delete resData[i][4];
                                    delete resData[i][5];
                                }

                                resolve(resData);
                            });
                            return p;
                        };

                        var resData = JSON.parse(body); //将json字符串转换成json对象
                        resData = resData.data;
                        updateResData().then(function (data) {

                            function sortJ(a, b) {
                                //按照id把k线json数据排序 
                                return b.id - a.id;
                            };
                            var resData = data.sort(sortJ); //排序后的data

                            //获取到标准格式的k线数据resData
                            _kline2.default.addKline(resData, function (result) {
                                //console.log("获取到了执行结果>>>>>>>>>",result);

                                if (result && result.res_code === "0000") {

                                    res.json({ 'res_code': '01' });
                                } else {

                                    res.json({ 'res_code': '01030001' }, { 'describe': 'insertKline error' });
                                }
                            });
                        });
                    } catch (e) {
                        console.log("eee...", e);
                    }
                } else {
                    console.log("error");
                    return;
                }
            });
        }
        //调用binance-api接口获取k线数据
        function getBinanceKlineData() {

            console.log("binance...991");
            return 0;
            var nowTime = new Date();

            var nowTimeStamp = new Date().getTime();

            console.log("start....binance_get_data>>>>me-TimeStamp", nowTimeStamp);

            var rp = require('request-promise');

            var requestOptions = {
                method: 'GET',
                uri: data.url,
                qs: {},
                headers: {
                    'X-MBX-APIKEY': 'YcK7OsEZkD8ycowOtEXOXHeYvzCWsFxxaV6kuD972HcwzhdEG8qz2SdGeG121SmA', //hailian159@gmail.com-hk小号
                    'timestamp': nowTimeStamp //当前时间戳

                },
                json: true,
                gzip: true
            };
            console.log('API --->>>>>>>>>:', data.url);
            rp(requestOptions).then(function (response) {
                console.log('API call binancebinancebinance----->>>>>>>>>okokok:', nowTimeStamp, response);
            }).catch(function (err) {
                console.log('API call error:', err);
            });

            return;
        }

        //开始执行>>>
        if (ex === "huobi") {
            //- - huobi

            var url = 'https://api.huobi.br.com/market/history/kline?period=' + period + '&size=' + size + '&symbol=' + currency;
            return getHuobiKlineData(url);
        } else if (ex === "okex") {
            //- - okex

            var checkCurrency = currency.substring(currency.length - 2); //截取后两位字符判断交易对的所属

            if (checkCurrency == "tc") {
                //btc   

                var strCurrency = currency.substring(0, currency.length - 3); //去掉后3位btc
                var okexCurrency = strCurrency + '-BTC';
            }
            if (checkCurrency == "th") {
                //eth

                var strCurrency = currency.substring(0, currency.length - 3); //去掉后3位eth
                var okexCurrency = strCurrency + '-ETH';
            }
            if (checkCurrency == "dt") {
                //usdt

                var strCurrency = currency.substring(0, currency.length - 4); //去掉后4位usdt
                var okexCurrency = strCurrency + '-USDT';
            }

            if (period === "5min") {
                var okexPeriod = 300;
            }
            if (period === "15min") {
                var okexPeriod = 900;
            }
            if (period === "30min") {
                var okexPeriod = 1800;
            }
            if (period === "60min") {
                var okexPeriod = 3600;
            }
            if (period === "1day") {
                var okexPeriod = 86400;
            }

            var url = 'https://www.okex.me/api/spot/v3/instruments/' + okexCurrency + '/candles?granularity=' + okexPeriod;

            return getOkexKlineData(url);
        } else if (ex === "gate") {
            //- - gate
            console.log("start2");
            var checkCurrency = currency.substring(currency.length - 2); //截取后两位字符判断交易对的所属

            if (checkCurrency == "tc") {
                //btc   

                var strCurrency = currency.substring(0, currency.length - 3); //去掉后3位btc
                var gateCurrency = strCurrency + '_btc';
            }
            if (checkCurrency == "th") {
                //eth

                var strCurrency = currency.substring(0, currency.length - 3); //去掉后3位eth
                var gateCurrency = strCurrency + '_eth';
            }
            if (checkCurrency == "dt") {
                //usdt

                var strCurrency = currency.substring(0, currency.length - 4); //去掉后4位usdt
                var gateCurrency = strCurrency + '_usdt';
            }

            if (period === "5min") {
                var gatePeriod = 300;var range_hour = 8.35;
            } //5min期间-取24小时内的k线数据
            if (period === "15min") {
                var gatePeriod = 900;var range_hour = 25;
            } //15min期间-取24小时内的k线数据
            if (period === "30min") {
                var gatePeriod = 1800;var range_hour = 50;
            } //30min期间-取24小时内的k线数据
            if (period === "60min") {
                var gatePeriod = 3600;var range_hour = 100;
            } //60min期间-取240小时内的k线数据
            if (period === "1day") {
                var gatePeriod = 86400;var range_hour = 2400;
            } //1day期间-取2400小时内的k线数据

            var url = 'https://data.gateio.co/api2/1/candlestick2/' + gateCurrency + '?group_sec=' + gatePeriod + '&range_hour=' + range_hour;
            return getGateKlineData(url);
        } else if (ex === "binance") {
            // - -binance
            var url = '';
            console.log("binance null ");
            return getBinanceKlineData();
        } else {
            console.log("income data error......");
        }
    }
};

module.exports = app;
//# sourceMappingURL=klineController.js.map