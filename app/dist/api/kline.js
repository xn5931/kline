'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var klineController = require('../controllers/klineController');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;


  var router = (0, _resourceRouterMiddleware2.default)({
    id: 'kline'
    /* functions: load, index, create, read, update and delete */
  });

  /** GET /facet/:id/latest */
  router.get('/:id/latest', function (req, res) {
    console.log(".......01");
    res.json("ok1");
  });

  /** POST /facet/:id */
  router.post('/:id/', function (req, res) {
    console.log(".......02");
    res.json("ok2");
  });

  /** POST api/kline/insert **/
  router.get('/:id/insert', function (req, res) {
    console.log("001...");
    klineController.insertKline(req, res); //插入k线数据
    //console.log("insert k");
  });

  return router;
};
//# sourceMappingURL=kline.js.map