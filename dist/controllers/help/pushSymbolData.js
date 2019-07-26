'use strict';

var _date = require('../../lib/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');


module.exports.getCoinTransactionPairListHelp = function (ex, cb) {

                //     //判断传入参数 - - 所属交易所类型
                //     function exType(ex){

                //         console.log('判断传入参数 - - 所属交易所类型',ex);

                //         var p = new Promise(function(resolve, reject){

                //                 if (ex === 'huobi') { 

                //                     var url = "https://api.huobi.br.com/market/tickers"


                //                     resolve({'ex':ex,'url':url});

                //                 }else if (ex === 'binance') {

                //                     var url = "https://api.binance.com/api/v1/ticker/24hr"
                //                     //var url = "https://api.binance.com/api/v1/time"
                //                     resolve({'ex':ex,'url':url});

                //                 }else if (ex === 'okex') { 

                //                     var url = "https://www.okex.me/api/spot/v3/instruments/ticker"

                //                     resolve({'ex':ex,'url':url});

                //                 }else if (ex ==='gate') { 

                //                     var url = "https://data.gateio.co/api2/1/marketlist" 

                //                     resolve({'ex':ex,'url':url});

                //                 }else{

                //                     console.log("传入的ex参数错误");
                //                     reject("传入的ex参数错误");
                //                 }

                //             });

                //          return p;

                //     } 

                // /******************************************************/
                //     //调用huobi-api接口获取实时行情数据
                //     function huobiApiData(data){

                //         //console.log("huobi api .... ok");

                //         request(data.url, function (error, response, body) {

                //             if (!error && response.statusCode == 200) {

                //                 try{

                //                     var body = JSON.parse(body);//将json字符串转换成json对象
                //                     //console.log("body..... ",body );

                //                     var cbData = body.data;

                //                     //console.log("cbData..... ",cbData );

                //                     cbData.push({"symbol":"huobi_ex1"});

                //                     return cb(cbData);

                //                 }catch(e){

                //                     //console.log("eee........",e,body);
                //                     return cb({'res_code':'01030005'},{'describe':'res json error- -Too Many Requests'});

                //                 }
                //             }else{

                //                 console.log("error");

                //                 return ;
                //             }

                //     })

                //     } 
                // /******************************************************/
                //      //调用binance-api接口获取实时行情数据
                //     function binanceApiData(data){

                //         let nowTime = new Date();

                //         let nowTimeStamp = new Date().getTime();

                //         console.log("start....binance_get_data>>>>me-TimeStamp",nowTimeStamp);

                //         const rp = require('request-promise');

                //         const requestOptions = {
                //           method: 'GET',
                //           uri: data.url,
                //           qs: {

                //           },
                //           headers: {
                //             'X-MBX-APIKEY': 'YcK7OsEZkD8ycowOtEXOXHeYvzCWsFxxaV6kuD972HcwzhdEG8qz2SdGeG121SmA',//hailian159@gmail.com-hk小号
                //             'timestamp':nowTimeStamp//当前时间戳

                //           },
                //           json: true,
                //           gzip: true
                //         };
                //         console.log('API --->>>>>>>>>:',data.url);
                //         rp(requestOptions).then(response => {
                //           console.log('API call binancebinancebinance----->>>>>>>>>okokok:',nowTimeStamp, response);
                //         }).catch((err) => {
                //           console.log('API call error:', err);
                //         });

                //         return;

                //     }
                // /******************************************************/
                //     //调用okex-api接口获取实时行情数据
                //     function okexApiData(data){

                //         //console.log("okexApiData api .... ok",data.url);

                //         request(data.url, function (error, response, body) {

                //             if (!error) {

                //                 try{


                //                     var cbData = JSON.parse(body);//将json字符串转换成json对象
                //                     //console.log("body....",body[0]);
                //                     return cb(cbData);

                //                 }catch(e){

                //                     //console.log("eee........",e,body);
                //                     return cb({'res_code':'01030005'},{'describe':'res json error- -Too Many Requests'});

                //                 }
                //             }else{

                //                 console.log("error");

                //                 return ;
                //             }

                //         })

                //         return;
                //     }

                // /******************************************************/
                //     //调用gate-api接口获取实时行情数据
                //     function gateApiData(data){

                //         //console.log("gateApiData api .... ok",data.url);

                //         request(data.url, function (error, response, body) {

                //             if (!error) {

                //                 try{
                //                     var cbData = JSON.parse(body);//将json字符串转换成json对象
                //                     //console.log("body....",body[0]);
                //                     return cb(cbData);

                //                 }catch(e){

                //                     console.log("eee........",e,body);
                //                     return cb({'res_code':'01030005'},{'describe':'res json error- -Too Many Requests'});

                //                 }
                //             }else{

                //                 console.log("error");

                //                 return ;
                //             }

                //         })

                //         return;

                //     }
                // /******************************************************/
                //     //开始执行>>>
                //     exType(ex)
                //     .then(function(data){

                //         if (data.ex === "huobi") {//- - huobi

                //             //console.log("hi huobi");

                //             return huobiApiData(data);

                //         }else if(data.ex === "okex"){//- - okex

                //             //console.log("hi okex");

                //             return okexApiData(data);

                //         }else if(data.ex === "gate"){//- - gate

                //             //console.log("hi gate");

                //             return gateApiData(data);

                //         }else if(data.ex === "binance"){// - -binance

                //             return binanceApiData(data);
                //         }else{

                //             console.log("传入参数错误......");

                //          }

                //       });


};
//# sourceMappingURL=pushSymbolData.js.map