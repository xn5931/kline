'use strict';

var _coinmarketcap = require('../models/coinmarketcap');

var _coinmarketcap2 = _interopRequireDefault(_coinmarketcap);

var _dbhelper = require('../models/dbhelper');

var _dbhelper2 = _interopRequireDefault(_dbhelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var md5 = require("md5");
var rp = require('request-promise');

var app = {
  //获取coinmarketcap的币种列表数据存储到本地数据库
  listLatest: function listLatest(req, res) {
    var requestOptions = {
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

    rp(requestOptions).then(function (response) {
      console.log('API call response:', response);
      var rData = response;
      _coinmarketcap2.default.addListLatest(rData, function (msg) {

        res.json({ msg: msg });
      });
    }).catch(function (err) {
      console.log('API call error:', err.message);
    });
  },
  getData: function getData(req, res) {

    var collection = 'coinmarketcap_listings_latest'; //查的表
    var obj = { "whereObj": "*" }; //查询参数

    _dbhelper2.default.find(collection, obj, function (resData) {

      res.json({ 'data': resData });
    });
  }
};
module.exports = app;
//# sourceMappingURL=coinmarketcapController.js.map