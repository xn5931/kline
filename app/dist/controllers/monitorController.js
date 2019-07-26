'use strict';

var _monitor2 = require('../models/monitor');

var _monitor3 = _interopRequireDefault(_monitor2);

var _date = require('../lib/date');

var _date2 = _interopRequireDefault(_date);

var _dbhelper = require('../models/dbhelper');

var _dbhelper2 = _interopRequireDefault(_dbhelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var md5 = require("md5");


var app = {

  monitor: function monitor(req, res) {

    var collection = req.query.collection; //表
    var period = req.query.period; //期间
    var currency = req.query.currency; //交易对货币类型
    var ex = req.query.ex; //交易所
    var table = 'monitor_bookkeeping';
    if (collection && period && currency && ex) {} else {
      res.json({ "none": "null req query" });return;
    }

    //Coinmarketcap实时数据


    //连续价格波动监测(连续突破和连续破位) - - 最新价格破位之前的所有计算都权重变减1
    var nowTime = new Date(); //时间
    var nowTimeStamp = new Date().getTime(); //当前时间戳
    var nowTimeYmd = _date2.default.onlymd(nowTimeStamp); //年月日

    /*获取筛选数据
      nowPrice
      cbMasOpenMax
      cbMasOpenMin
      cbMasCloseMax
      cbMasCloseMin
      cbMasHighMax
      cbMasHighMin
      cbMasLowMax
      cbMasLowMin
    */
    function getPrice() {

      var p = new Promise(function (resolve, reject) {

        var obj = { 'whereObj': 'ID,OPEN,CLOSE,HIGH,LOW' }; //dbhelper - - obj

        _monitor3.default.price(collection, obj, function (cbMas) {

          function sortJ(a, b) {
            //按照id把k线json数据排序  
            return b.ID - a.ID;
          };

          cbMas = cbMas.sort(sortJ); //排序后的cbMas


          var D_value = 0; //权重
          var countNum = -1; //记数
          var cbMasClose = []; //所有收盘价
          var cbMasOpen = []; //所有开盘价
          var cbMasHigh = []; //所有最高点
          var cbMasLow = []; //所有的最低点
          var kRange = 5; //监测的k线范围

          for (var i in cbMas) {
            //筛选到新数组

            countNum++;

            if (countNum < kRange) {

              cbMasOpen.push(cbMas[i].OPEN); //开盘价
              cbMasClose.push(cbMas[i].CLOSE); //收盘价
              cbMasHigh.push(cbMas[i].HIGH); //最高价
              cbMasLow.push(cbMas[i].LOW); //最低价
            }
          }

          function getMaximin(arr, maximin) {
            //筛选最大值和最小值

            if (maximin == "max") {
              //最大

              return Math.max.apply(Math, arr);
            } else if (maximin == "min") {
              //最小

              return Math.min.apply(Math, arr);
            }
          }

          var nowPrice = Number(cbMas[0].CLOSE); //当前价
          var cbMasOpenMax = getMaximin(cbMasOpen, "max"); //开盘最大
          var cbMasOpenMin = getMaximin(cbMasOpen, "min"); //开盘最小
          var cbMasCloseMax = getMaximin(cbMasClose, "max"); //收盘最大
          var cbMasCloseMin = getMaximin(cbMasClose, "min"); //收盘最小
          var cbMasHighMax = getMaximin(cbMasHigh, "max"); //最高最大
          var cbMasHighMin = getMaximin(cbMasHigh, "min"); //最高最小
          var cbMasLowMax = getMaximin(cbMasLow, "max"); //最低最大
          var cbMasLowMin = getMaximin(cbMasLow, "min"); //最低最小

          var data = [{ 'nowPrice': nowPrice, //当前价0
            'cbMasOpenMax': cbMasOpenMax, //开盘最大1
            'cbMasOpenMin': cbMasOpenMin, //开盘最小2
            'cbMasCloseMax': cbMasCloseMax, //收盘最大3
            'cbMasCloseMin': cbMasCloseMin, //收盘最小4
            'cbMasHighMax': cbMasHighMax, //最高最大5
            'cbMasHighMin': cbMasHighMin, //最高最小6
            'cbMasLowMax': cbMasLowMax, //最低最大7
            'cbMasLowMin': cbMasLowMax }]; //最低最小8

          // console.log("当前价",cbMas[0].CLOSE);//当前价0
          // console.log(getMaximin(cbMasOpen,"max"));//开盘最大1
          // console.log(getMaximin(cbMasOpen,"min"));//开盘最小2
          // console.log(getMaximin(cbMasClose,"max"));//收盘最大3
          // console.log(getMaximin(cbMasClose,"min"));//收盘最小4
          // console.log(getMaximin(cbMasHigh,"max"));//最高最大5
          // console.log(getMaximin(cbMasHigh,"min"));//最高最小6
          // console.log(getMaximin(cbMasLow,"max"));//最低最大7
          // console.log(getMaximin(cbMasLow,"min"));//最低最小8
          resolve(data);
        });
      });
      return p;
    }
    /*
      计算数据:
        1.破位 - - 跌破最低点 - - 当前价小于cbMasLowMax
        2.突破 - - 突破最高点 - - 当前价大于cbMasHighMax
        3.
    */
    function compute(data) {

      var p = new Promise(function (resolve, reject) {

        if (data[0].nowPrice < data[0].cbMasLowMax) {
          //跌破最低点

          data[0].unusualType = '破位'; // 类型 - - 跌破最低点
          data[0].monitorPrice = data[0].cbMasLowMax; //监测的基准价格
        } else if (data[0].nowPrice > data[0].cbMasHighMax) {
          //突破最高点

          data[0].unusualType = '突破'; // 类型 - - 突破最高点
          data[0].monitorPrice = data[0].cbMasHighMax; //监测的基准价格
        } else {

          console.log("other");
          data[0].unusualType = 0; // 类型 - - 其他
        }
        resolve(data);
      });
      return p;
    }

    //查询异常波动消息
    function check(data) {
      var p = new Promise(function (resolve, reject) {

        //查询异动消息是否已经记录  
        var createID = ex + currency + period; //创建ID
        var newID = md5(createID); //生成ID
        newID = newID.replace(/[^0-9]/ig, ""); //去除字母
        var ID = newID.substring(newID.length - 5); //取值后5位
        var obj = { whereObj: 'COUNT(*) as count', limit: 'ID', sortObj: ID };

        _dbhelper2.default.findOne(table, obj, function (result) {

          if (result && result[0].count === 0) {

            data[0].carryOut = 1; //执行类型插入 
          } else {

            data[0].carryOut = 2; //执行类型更新 
          }

          data[0].ID = ID; //  add- - ID

          resolve(data);
        });
      });
      return p;
    }

    //更新异常波动消息
    function update(data) {
      var p = new Promise(function (resolve, reject) {

        var D_change = (data[0].nowPrice - data[0].monitorPrice) / data[0].nowPrice * 100; //涨跌幅-百分比
        D_change = D_change.toFixed(2); //保留小数点后面2位
        if (D_change == NaN) {
          D_change = 0;
        }
        var upObj = ' VALID_TIME = "' + nowTimeYmd + '",PRICE = "' + data[0].nowPrice + '",RATE_PERCENT = "' + D_change + '"';

        _dbhelper2.default.updateOneById(table, data[0].ID, upObj, function (err, result) {
          //执行更新最新一条
          if (!err) {

            res.json({ "res_code": "02" });
          } else {

            console.log(err);
            return;
          }
        });
      });
      return p;
    }

    /*
      ID 唯一身份id 
      START_TIME 第一次监测到发生的ymd时间 
      VALID_TIME 有效时间  
      EX 交易所  
      CURRENCY交易对  
      PERIOD 区间  
      PRICE 价格  
      RATE_PERCENT涨跌 
      TYPE异常波动的消息类型 
    */
    //插入异常波动消息 
    function insert(data) {

      var p = new Promise(function (resolve, reject) {

        var keyObj = 'ID,START_TIME,VALID_TIME,EX,CURRENCY,PERIOD,PRICE,RATE_PERCENT,TYPE';
        var D_change = (data[0].nowPrice - data[0].monitorPrice) / data[0].nowPrice * 100; //涨跌幅-百分比
        D_change = D_change.toFixed(2); //保留小数点后面2位
        if (D_change === NaN) {
          D_change = 0;
        }
        var value = data[0].ID + ',"' + nowTimeYmd + '","' + nowTimeYmd + '","' + ex + '","' + currency + '","' + period + '","' + data[0].nowPrice + '","' + D_change + '","' + data[0].unusualType + '"';

        _dbhelper2.default.insertOne(table, keyObj, value, function (err, result) {

          if (!err) {

            res.json({ "res_code": "01" });
          } else {
            console.log(err);
          }
        });
      });
      return p;
    }

    getPrice().then(function (data) {

      return compute(data);
    }).then(function (data) {

      return check(data);
    }).then(function (data) {

      if (data[0].carryOut == 0) {
        console.log("other.");res.json({ 'other': '待更新' });
      }; //其他
      if (data[0].carryOut == 1) {
        console.log("insert.");return insert(data);
      }; //插入
      if (data[0].carryOut == 2) {
        console.log("update.");return update(data);
      }; //更新
    });
  },
  //查监测数据
  getData: function getData(req, res) {

    var collection = 'monitor_bookkeeping'; //查的表
    var obj = { "whereObj": "*" }; //查询参数

    _dbhelper2.default.find(collection, obj, function (resData) {

      res.json({ 'data': resData });
    });
  }
};

module.exports = app;
//# sourceMappingURL=monitorController.js.map