import resource from 'resource-router-middleware';
var klineController = require('../controllers/klineController');
var symbolController = require('../controllers/symbolController');
var monitorController = require('../controllers/monitorController');
var coinmarketcapController = require('../controllers/coinmarketcapController');
var test = require('../controllers/testController');

export default ({ config, db }) => {
    //functions:load,index,create,read,update,delete 
    var router = resource({id:'api'},);
    //...api
    router.get('/:id/', function (req,res) {res.json("net connection");});
    //...api/kline/insert(插入k线数据)--pass
    router.get('/:id/kline/insert', function (req,res) {klineController.insertKlineData(req,res);});
    //...api/kline/insert(insert交易对数据)--pass
    router.get('/:id/symbol/insert/latestData', function (req,res) {symbolController.getSymbolData(req,res);});
    //...api/symbol/latestData/get(get交易对数据)--pass
    router.get('/:id/symbol/latestData/get', function (req,res) {symbolController.pushSymbolData(req,res);});
    //...api/kline/monitor(监测数据)--pass
    router.get('/:id/kline/monitor', function (req,res) { monitorController.monitor(req,res);});
    //测试单元(k线)
    router.get('/:id/test/kline', function (req,res) { test.kline(req,res);});
    //查--monitor
    router.get('/:id/monitor/data', function (req,res) { monitorController.getData(req,res);});
    //coinmarketcap--插入最新的币种列表数据
    router.get('/:id/coinmarketcap/listLatest/insert', function (req,res) { coinmarketcapController.listLatest(req,res);});
    //查--coinmarketcap
    router.get('/:id/coinmarketcap/data', function (req,res) { coinmarketcapController.getData(req,res);});
    
    //返回
    return router;
}




