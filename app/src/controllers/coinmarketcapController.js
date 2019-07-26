import coinmarketcap from '../models/coinmarketcap';
import dbhelper from '../models/dbhelper';

var request = require('request');
var md5 =require("md5");
const rp = require('request-promise');

var app = {
    //获取coinmarketcap的币种列表数据存储到本地数据库
  listLatest:function(req,res){
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
          'start': '1',
          'limit': '5000',
          'convert': 'USD'
        },
        headers: {
          'X-CMC_PRO_API_KEY': '5845a7f7-4f45-41bc-8d03-2bed2e1c6d34'
        },
        json: true,
        gzip: true
      };

      rp(requestOptions).then(response => {
        console.log('API call response:', response);
        var rData = response;
        coinmarketcap.addListLatest(rData,function(msg){
            
            res.json({msg:msg});
        });
      }).catch((err) => {
        console.log('API call error:', err.message);
      });
    
    },
    getData: function(req,res){

        var collection = 'coinmarketcap_listings_latest';//查的表
        var obj={"whereObj":"*"};//查询参数

          dbhelper.find(collection,obj,function(resData){

              res.json({'data':resData});
          })             
    }
}
module.exports = app;







