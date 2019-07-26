import klineModel from '../models/kline';
import gtpHelp from './help/getCoinTransactionPairListHelp';
var request = require('request');
import symbolModel from '../models/symbol';
var md5 =require("md5");
import dbhelper from '../models/dbhelper';
var app = {
    //获取交易所api实时数据，增删改查处理成统一的格式提交给model层(存储到数据库)- - pass
    getSymbolData: function(req,res){

        //判断传入参数 - - 所属交易所类型 - - 'huobi','okex','binance','gate'
        var ex = req.query.ex;
        var nowTime = new Date();
        var nowTimeStamp = new Date().getTime();//当前时间戳

        //交易所类型选择(定义api接口)- - exType()
        function exType(ex){

            var p = new Promise(function(resolve, reject){

                    if (ex === 'huobi') { 

                        var url = "https://api.huobi.br.com/market/tickers"                    
                        resolve({'ex':ex,'url':url});

                    }else if (ex === 'binance') {

                        var url = "https://api.binance.com/api/v1/ticker/24hr"
                        resolve({'ex':ex,'url':url});

                    }else if (ex === 'okex') { 

                        var url = "https://www.okex.me/api/spot/v3/instruments/ticker"
                        resolve({'ex':ex,'url':url});

                    }else if (ex ==='gate') { 

                        var url = "https://data.gateio.co/api2/1/marketlist" 
                        resolve({'ex':ex,'url':url});

                    }else{

                        console.log("传入的ex参数错误");
                        reject("传入的ex参数错误");
                    }
                });
             return p;
        } 
        function huobiApiData(data){

            console.log("huobiApiData>>>ok...");

            request(data.url, function (error, response, body) {
                
                if (!error && response.statusCode == 200) {
                    
                    try{
                        var body = JSON.parse(body);//将json字符串转换成json对象
                    }catch(e){
                        console.log("error...",e);
                        res.json({'res_code':'01030003'},{'describe':'res json error- -Too Many Requests'});
                        return ;
                    }

                    //console.log(body.data[0])
                   /* 获取的交易所数据示例
                   { open: 0.303969,
                      close: 0.306964,
                      low: 0.29661,
                      high: 0.309624,
                      amount: 8427.399578576687,以基础币种计量的交易量 xmr
                      count: 3798,
                      vol: 2568.0727276771813,以报价币种计量的交易量eth
                      symbol: 'xmreth' }
                    */
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
                    //if (body) {

                        var resData = body.data;//接收后台返的json
                        
                        for (var i in resData) {
                            
                            var symbol =resData[i].symbol;//遍历所有属性交易对
                            var nsymbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属
                            var newID= md5(resData[i].symbol);//生成id
                            var id = newID.replace(/[^0-9]/ig,""); //去除字母
                                id = id.substring(id.length-5);//取值后5位

                            if (nsymbol == "tc") {//btc

                                resData[i].coinname = symbol.substring(0, symbol.lastIndexOf('btc'));//删除末尾的多余字符btc-(ethbtc)
                                resData[i].symbol_type = "btc";
                                resData[i].id = id;//id
                              //  var test = resData[i].symbol.charCodeAt();
                               // console.log("idididiidididi1.....",test,resData[i].symbol);
                               // var str ="aa32b231";
                                //var value = str.replace(/[^0-9]/ig,""); 
                                //console.log("ok?>>>>>>>>>>",value);   
                            }
                            
                            else if (nsymbol == "th") {//eth

                                resData[i].coinname = symbol.substring(0, symbol.lastIndexOf('eth'));//删除末尾的多余字符btc-(ethbtc)
                                resData[i].symbol_type = "eth";
                                resData[i].id = id;//id
                            }

                            else if (nsymbol == "dt") {//usdt

                                resData[i].coinname = symbol.substring(0, symbol.lastIndexOf('usdt'));//删除末尾的多余字符btc-(ethbtc)
                                resData[i].symbol_type = "usdt";
                                resData[i].id = id;//id  
                            }

                            else if (nsymbol == "ht") {//ht

                                resData[i].coinname = symbol.substring(0, symbol.lastIndexOf('ht'));//删除末尾的多余字符btc-(ethbtc)
                                resData[i].symbol_type = "ht";
                                resData[i].id = id;//id
                                
                            }
                            else{
                                delete resData[i];

                            }
                            if(resData[i] !== undefined){
                                //改
                                resData[i].price = resData[i].close;//当前价
                                resData[i].hight = resData[i].high;//最高价
                                var rate_percent = ((resData[i].close-resData[i].open)/resData[i].open)*100;//涨跌幅
                                    rate_percent = rate_percent.toFixed(2);//保留小数点后面3位
                                if(rate_percent == "NaN"){rate_percent = 0;}//排除NaN
                                resData[i].rate_percent = rate_percent;
                                var vol = resData[i].vol;
                                    vol = parseInt(vol);//取整
                                resData[i].vol = vol;//成交量去除小数部分
                                
                                
                                //删
                                delete resData[i].symbol //删除key - - symbol
                                delete resData[i].open //删除key - - open
                                delete resData[i].close //删除key - - close
                                delete resData[i].count //删除key - - count
                                delete resData[i].amount //删除key - - amount
                                //增
                                resData[i].timestamp =  nowTimeStamp;//时间戳    
                            }  
                        }

                    // }else{
                    //     throw new Error(res)
                    // }

                    //交易所api接口获取的实时数据,处理后提交给model
                    var options={ex:"huobi"};
                    
                    symbolModel.insertOne(options,resData,function(result){//console.log("获取到了执行结果>>>>>>>>>>",result);

                        if (result && result.res_code === "0000") {

                            res.json({'res_code':'01'});//插入或更新成功

                        }else{

                            res.json({'res_code':'01030001'},{'describe':result});//存在错误

                        }
                    });//model插入数据
                }else{

                    if (!error && response.statusCode == 429){

                        console.log("请求太频繁>>>>>>>");
                        res.send("'res_code':'01030000','describe':'请求太频繁>>>>>>>'");

                    }else{

                        console.log("004...",error);
                        res.send("'res_code':'01030004'");
                    }
                    return ;
                }
            })  
        }

        //okex
        function okexApiData(data){
           /*   获取的交易所数据示例
                best_ask: '2.083',
                best_bid: '2.072',
                instrument_id: 'WTC-USDT',
                product_id: 'WTC-USDT',
                last: '2.078',
                ask: '2.083',
                bid: '2.072',
                open_24h: '1.985',
                high_24h: '2.336',
                low_24h: '1.933',
                base_volume_24h: '82951.99695',
                timestamp: '2019-07-05T02:43:31.145Z',
                quote_volume_24h: '179148.38494915'
            */
            /*  
                best_ask    String  卖一价
                best_bid    String  买一价
                instrument_id   String  币对名称
                product_id...
                last    String  最新成交价
                ask...
                bid...
                open_24h    String  24小时开盘价
                high_24h    String  24小时最高价
                low_24h String  24小时最低价
                base_volume_24h String  24小时成交量，按交易货币统计
                timestamp   String  系统时间戳
                quote_volume_24h    String  24小时成交量，按计价货币统计
            
            */
            /* 
                数据库表中所需插入的数据
                ID - - 唯一 ok
                COINNAME - - 币名 symbol（前）
                PRICE - - 当前价 close
                HIGHT - - 最高价 high
                LOW - - 最低价 low
                VOL - - 成交量 vol
                RATE_PERCENT - - 涨跌幅百分比 （open-close）/open 保留小数点后一位（10.1%）
                SYMBOL_TYPE - - 交易对类型(usdt,btc,eth...) symbol（后）
                TIMESTAMP - - 时间戳 ok
             */ 
            request(data.url, function (error, response, body) {

            if (body) {
               // console.log("body....1",body.data);
                try{

                    var resData = JSON.parse(body);//将json字符串转换成json对象
                }catch(e){

                    console.log("error...",e);
                }
            }else{

                console.log("error",error);
                return ;
            }

            //console.log("resDataresData>>>>",resData[0]);

            for (var i in resData) {
                        
                var symbol =resData[i].instrument_id;//遍历所有属性交易对-判断交易对的所属
                    symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属
                var newID= md5(resData[i].instrument_id);//生成id
                var id = newID.replace(/[^0-9]/ig,""); //去除字母
                    id = id.substring(id.length-5);//取值后5位
                var coinnameStr =  resData[i].instrument_id;//获取name     

                if (symbol == "TC") {//BTC
            
                    resData[i].symbol_type = "btc";
                    var vol = resData[i].base_volume_24h;//成交量
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('-BTC'));//删除末尾的多余字符-BTC

                }else if  (symbol == "TH") {//ETH
                    
                    resData[i].symbol_type = "eth"; 
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('-ETH'));//删除末尾的多余字符-ETH
                    var vol = resData[i].base_volume_24h;//成交量
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    
                }else if  (symbol == "DT") {//USDT

                    resData[i].symbol_type = "usdt";
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('-USDT'));//删除末尾的多余字符-USDT
                    var vol = resData[i].base_volume_24h;//成交量
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    
                } else{

                    delete resData[i];

                }
                                       
                if(resData[i] !==undefined){

                    //改
                    resData[i].price = resData[i].last;//当前价
                    resData[i].hight = resData[i].high_24h;//最高价
                    resData[i].low = resData[i].low_24h;//最低价
                    var rate_percent = ((resData[i].last-resData[i].open_24h)/resData[i].open_24h)*100;//涨跌幅
                    resData[i].rate_percent =rate_percent.toFixed(2);//保留小数点后面2位

                    //删
                    delete resData[i].best_ask //删除key 
                    delete resData[i].best_bid //删除key 
                    delete resData[i].instrument_id //删除key 
                    delete resData[i].product_id //删除key 
                    delete resData[i].last //删除key 
                    delete resData[i].ask //删除key
                    delete resData[i].bid //删除key 
                    delete resData[i].open_24h //删除key  
                    delete resData[i].high_24h //删除key 
                    delete resData[i].low_24h //删除key 
                    delete resData[i].base_volume_24h //删除key 
                    delete resData[i].quote_volume_24h //删除key 
                    delete resData[i].timestamp //删除key 

                    //增
                    resData[i].timestamp =  nowTimeStamp;//时间戳
                    
                } 
            }
            //console.log("resData[i]resData[i]resData[i]2",resData[i]);
            //交易所api接口获取的实时数据,处理后提交给model
            var options={ex:"okex"};
            
            symbolModel.insertOne(options,resData,function(result){

                if (result && result.res_code === "0000") {

                    res.json({'res_code':'01'});//插入或更新成功

                }else{

                    res.json({'res_code':'01030001'},{'describe':result});//存在错误

                }
            });//model插入数据
        })
        return 0
    }
        //gate
        function gateApiData(data){
        
        /*  symbol : 币种标识
            name: 币种名称
            name_en: 英文名称
            name_cn: 中文名称
            pair: 交易对
            rate: 当前价格
            vol_a: 被兑换货币交易量
            vol_b: 兑换货币交易量
            curr_a: 被兑换货币
            curr_b: 兑换货币
            curr_suffix: 货币类型后缀
            rate_percent: 涨跌百分百
            trend: 24小时趋势 up涨 down跌
            supply: 币种供应量
            marketcap: 总市值
            plot: 趋势数据
        */ 
        /*
              data....2 { no: 1,
              symbol: 'BTC',
              name: 'Bitcoin',
              name_en: 'Bitcoin',
              name_cn: '比特币',
              pair: 'btc_usdt',
              rate: '11157.14',
              vol_a: '7489.0777542725',
              vol_b: '80,473,175',
              curr_a: 'BTC',
              curr_b: 'USDT',
              curr_suffix: ' USDT',
              rate_percent: '9.54',
              trend: 'up',
              supply: 16596000,
              marketcap: '185,163,895,440',
              lq: '0' }
        */
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
        request(data.url, function (error, response, body) {

            if (body) {
               // console.log("body....1",body.data);

                try{

                    var resBody = JSON.parse(body);//将json字符串转换成json对象
                    var resData = resBody.data;

                }catch(e){

                    console.log("eee........",e);

                }
            }else{

                console.log("error",error);
                return ;
            }

            //console.log("resDataresData>>>>",resData[0]);

            for (var i in resData) {
                        
                var symbol =resData[i].curr_b;//遍历所有属性交易对-判断交易对的所属

                symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属

                if (symbol == "TC") {//BTC
            
                    resData[i].symbol_type = "btc";
                    resData[i].vol = resData[i].vol_b;//成交量

                }else if  (symbol == "TH") {//ETH
                    
                    resData[i].symbol_type = "eth"; 
                    resData[i].vol = resData[i].vol_b;//成交量
                    
                }else if  (symbol == "DT") {//USDT

                     resData[i].symbol_type = "usdt";
                     //console.log("resData[i]......>>>>>>",resData[i]);
                     var valstr = resData[i].vol_b;
                     var newValstr = valstr.replace(',', '');//去除vol里面的逗号

                    // console.log(">>>>>>>>>>>123",valstr,newValstr);
                     
                    
                } else{

                    delete resData[i];

                }
                                       
                if(resData[i] !==undefined){

                    //改
                    resData[i].id =  resData[i].no;//ID
                    resData[i].coinname =  resData[i].symbol;//name 
                    resData[i].price = resData[i].rate;//当前价
                    resData[i].hight = 0;//最高价
                    resData[i].low = 0;//最高价
                    resData[i].vol = 0;//成交量
                    
                    //删
                    delete resData[i].lq //删除key 
                    delete resData[i].marketcap //删除key 
                    delete resData[i].supply //删除key 
                    delete resData[i].trend //删除key 
                    delete resData[i].curr_suffix //删除key 
                    delete resData[i].curr_a //删除key 
                    delete resData[i].curr_b //删除key 
                    delete resData[i].vol_a //删除key 
                    delete resData[i].vol_b //删除key
                    delete resData[i].rate //删除key 
                    delete resData[i].pair //删除key  
                    delete resData[i].name_cn //删除key 
                    delete resData[i].name_en //删除key 
                    delete resData[i].name //删除key 
                    delete resData[i].symbol //删除key 
                    delete resData[i].no //删除key 

                    //增
                    resData[i].timestamp =  nowTimeStamp;//时间戳
                    
                } 

            }
            //console.log("resData[i]resData[i]resData[i]2",resData[i]);
            //交易所api接口获取的实时数据,处理后提交给model
            var options={ex:"gate"};
            
            symbolModel.insertOne(options,resData,function(result){

                console.log("获取到了执行结果>>>>>>>>>>",result);

                if (result && result.res_code === "0000") {

                    res.json({'res_code':'01'});//插入或更新成功

                }else{

                    res.json({'res_code':'01030001'},{'describe':result});//存在错误

                }
            });//model插入数据
        })
        return 0

      
        }
        //binance
        function binanceApiData(data){

            request(data.url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    try{
                        var body = JSON.parse(body);//将json字符串转换成json对象

                    }catch(e){
                        console.log("error...",e);
                        return ;
                    }
                  var resData = body;
                }
            })

            for (var i in resData) {
                        
                var symbol =resData[i].symbol;//遍历所有属性交易对-判断交易对的所属
                    symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属
                var newID= md5(resData[i].symbol);//生成id
                var id = newID.replace(/[^0-9]/ig,""); //去除字母
                    id = id.substring(id.length-5);//取值后5位
                var coinnameStr =  resData[i].symbol;//获取name     

                if (symbol == "TC") {//BTC
            
                    resData[i].symbol_type = "btc";
                    var vol = resData[i].quoteVolume;//成的btc数量(成交量)
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('BTC'));//删除末尾的多余字符BTC

                }else if  (symbol == "TH") {//ETH
                    
                    resData[i].symbol_type = "eth"; 
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('ETH'));//删除末尾的多余字符ETH
                    var vol = resData[i].quoteVolume;//成的eth数量(成交量)
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    
                }else if  (symbol == "DT") {//USDT

                    resData[i].symbol_type = "usdt";
                    resData[i].id = id;//id
                    resData[i].coinname = coinnameStr.substring(0, coinnameStr.lastIndexOf('USDT'));//删除末尾的多余字符USDT
                    var vol = resData[i].quoteVolume;//成的usdt数量(成交量)
                    vol = parseInt(vol);
                    resData[i].vol = vol;//成交量去除小数部分
                    
                } else{

                    delete resData[i];

                }
                                       
                if(resData[i] !==undefined){

                    //改
                    resData[i].price = resData[i].lastPrice;//当前价
                    resData[i].hight = resData[i].highPrice;//最高价
                    resData[i].low = resData[i].lowPrice;//最低价
                    var rate_percent = ((resData[i].lastPrice-resData[i].openPrice)/resData[i].openPrice)*100;//涨跌幅
                    resData[i].rate_percent =rate_percent.toFixed(2);//保留小数点后面2位

                    //删
                    delete resData[i].symbol //删除key 
                    delete resData[i].priceChange //删除key 
                    delete resData[i].priceChangePercent //删除key 
                    delete resData[i].weightedAvgPrice //删除key 
                    delete resData[i].lastPrice //删除key 
                    delete resData[i].lastQty //删除key
                    delete resData[i].bidPrice //删除key 
                    delete resData[i].askQty //删除key  
                    delete resData[i].openPrice //删除key 
                    delete resData[i].highPrice //删除key 
                    delete resData[i].lowPrice //删除key 
                    delete resData[i].volume //删除key 
                    delete resData[i].quoteVolume //删除key 
                    delete resData[i].openTime//删除key
                    delete resData[i].closeTime//删除key
                    delete resData[i].firstId//删除key
                    delete resData[i].lastId//删除key
                    delete resData[i].count//删除key

                    //增
                    resData[i].timestamp =  nowTimeStamp;//时间戳
                    
                } 
            }
            //console.log("resData[i]resData[i]resData[i]2",resData[i]);
            //交易所api接口获取的实时数据,处理后提交给model
            var options={ex:"binance"};
            
            symbolModel.insertOne(options,resData,function(result){

                if (result && result.res_code === "0000") {

                    res.json({'res_code':'01'});//插入或更新成功

                }else{

                    res.json({'res_code':'01030001'},{'describe':result});//存在错误

                }
            });//model插入数据          



        }
 
    //开始执行>>>exType()选择传入参数类型
    exType(ex)
    .then(function(data){

        if (data.ex === "huobi") {//- - huobi
            return huobiApiData(data);
        }else if(data.ex === "okex"){//- - okex
            return okexApiData(data);
        }else if(data.ex === "gate"){//- - gate
            return gateApiData(data);
        }else if(data.ex === "binance"){//- -binance
            return binanceApiData(data);
        }else{
            console.log("ex error...");
         }
      });
    },
    pushSymbolData:function(req,res){//api -(存储在数据库的交易所交易对列表的实时数据 - 推送到前端 - - pass)

        if (req && req.query.ex ==="huobi" || req.query.ex ==="binance" || req.query.ex ==="okex" || req.query.ex ==="gate") {

            var ex = req.query.ex;//交易所类型

            var obj={"whereObj":"*"};//查询参数

            var collection = req.query.ex+'_symbol_latest ORDER BY PRICE';//查表

            dbhelper.find(collection,obj,function(resData){

                res.json({'data':resData});

            })             

        }else{

            res.json({'res_code':'01030009','describe':'ex null'});
            return ;
        }
    }
}
module.exports = app;







