var request = require('request');
var md5 =require("md5");
import monitor from '../models/monitor';
import date from '../lib/date';
import dbhelper from '../models/dbhelper';



var app = {

    kline: function(req,res){

        var collection = req.query.collection;//表
        //var period= req.query.period;//期间
       //var currency = req.query.currency;//交易对货币类型
        //var ex = req.query.ex;//交易所//
        //console.log("009.....",ex,currency,period);
        var obj = {whereObj:"MAX(UPDATE_TIME) as time"};
        dbhelper.find(collection,obj,function(result){
  
          if (result && result[0] !== undefined) {
            res.json({'table':collection,'updateTime':result[0].time});
          }else{
            res.json({'null':collection});
          }
        })
       

	},
  test :function(){

         //吃饭
      // function eat(data){
      
      // var p = new Promise(function(resolve, reject){
        
      //    });
      //   return p;
      // } 

        // var obj = {'whereObj':'OPEN,CLOSE'};//dbhelper-obj
        // var nowTime = new Date();//时间
        // var nowTimeStamp = new Date().getTime();//当前时间戳
        // var nowTimeYmd = date.ymd(nowTimeStamp);//年月日
        //TIME  EX  CURRENCY  PRICE  RATE_PERCENT 

     // monitor.price(collection,obj,function(cbMas){ // 5min - 50min,15min - 2.5h, 30min - 5h , 60min - 10h, 1d - 10d;   

        // var D_value = 0;//权重
        // var strength = 0 ; //累计
        // var countNum = -1; //记数
        // var Data = [];
        // var cbMasClose = [];//所有收盘价
        // var cbMasOpen = [];//所有开盘价

        // for(var i in cbMas){
        //   countNum++;
        //   if (countNum <100) {
        //     cbMasOpen.push(cbMas[i].OPEN);//开盘价
        //     cbMasClose.push(cbMas[i].CLOSE);//收盘价

        //     //var D_value = cbMas[i].CLOSE - cbMas[i].OPEN;//大于0阳线,小于0阴线
        //     //D_value = D_value.toFixed(2);//保留小数点后两位
        //     //D_value  = Number(D_value);//字符串 转 数字
        //     // strength = strength + D_value;//累计+
        //   }
        // }

      //strength = strength.toFixed(2);//保留小数点后两位
        
        //5min  15min  30min  60min   1d 任何一根线涨跌幅度超过了5%进行记录
        // var D_change = ((cbMas[0].CLOSE - cbMas[0].OPEN)/cbMas[0].OPEN)*100;//涨跌幅-百分比
        // var table = 'monitor_bookkeeping';
        // var keyObj = 'ID,TIME,EX,CURRENCY,PERIOD,PRICE,RATE_PERCENT';
        // var CID = ex+currency+period;
        // var newID= md5(CID);//生成id
        //     newID = newID.replace(/[^0-9]/ig,"");//去除字母
        // var ID = newID.substring(newID.length-5);//取值后5位
        // var value =  ID+',"'+nowTimeYmd+'","'+ex+'","'+currency+'","'+period+'","'+cbMas[0].CLOSE+'","'+D_change+'"';

        //查询异动消息是否已经记录  
        // var obj = {whereObj:'COUNT(*) as count',limit:'ID',sortObj:ID}; 
        // dbhelper.findOne(table,obj,function(result){
        // console.log("ex,id,D_change...",ex,ID,D_change);
        //   if (result && result[0].count === 0) {
        //     if (D_change>0.5 || D_change<-0.5) {
        //       //插入异动流水 - -  ID 唯一身份id START_TIME 第一次监测到发生的ymd时间 VALID_TIME 更新时间  EX 交易所  CURRENCY交易对  PERIOD 区间  PRICE 价格  MAX_RATE_PERCENT涨跌 
        //     dbhelper.insertOne(table,keyObj,value,function(err,result){
                
        //         if (!err) {
        //           console.log("insert...bookkeeping...ok");
        //         }else{
        //           console.log(err);
        //         }
        //     })
        //     }
        //   }else{
        //     console.log("up>>>>>>",D_change);
        //   }
        // })
     // })
  }
}	

module.exports = app;









