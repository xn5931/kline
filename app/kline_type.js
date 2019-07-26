
// ex 交易所
// currency 交易对的类型
//返回请求的交易所的对应交易对的json数据包
module.exports.kline_type=function(cb){

  var ex = ["huobi","binance","okex","gate"];//"huobi","binance","okex","gate"
  var currency = ["btcusdt","ethusdt","eosusdt","bchusdt","ltcusdt"];//三个交易所都有的交易对

  var huobiCurrency = ["ogousdt"];//huobi - 独有交易对--"huobionly1","huobionly2"
  var binanceCurrency = [];//binance - 独有交易对--"bianceonly1","bianceonly2"
  var okexCurrency = [];//okex - 独有交易对--"okexonly1","okexonly2"

  var period = ["5min","15min","30min","60min"];//"1min","5min","15min","30min","60min","1day","1mon","1week","1year"
  
  var counti = 0;
  var countj = 0; 
  var countk = 0;
  var exRes = [];

  //所有交易所类型数据包
  for(var i in ex){

    counti++;

    for( var j in currency){//交易对类型

      countj++;

      for(var k in period){//k线时间区间

        countk++;
        var res = {"ex":ex[i],"currency":currency[j],"period":period[k]};//生成三个交易所都有的交易对
            exRes.push(res);
      }
    }
  }
 
  //火币交易所独有的交易对
  for(var x in huobiCurrency){

    for(var y in period){

      var resOnlyhuobi = {"ex":"huobi","currency":huobiCurrency[x],"period":period[y]};//生成火币交易所独有的交易对
          exRes.push(resOnlyhuobi);
    }
  }

  //币安交易所独有的交易对
  for(var x in binanceCurrency){

    for(var y in period){

      var resOnlybinance = {"ex":"binance","currency":huobiCurrency[x],"period":period[y]};//生成币安交易所独有的交易对
          exRes.push(resOnlybinance);
    }
  }

  //okex交易所独有的交易对
  for(var x in okexCurrency){

    for(var y in period){

      var resOnlyokex = {"ex":"okex","currency":huobiCurrency[x],"period":period[y]};//生成okex交易所独有的交易对
          exRes.push(resOnlyokex);
    }
  }


  cb(exRes);
  
}

