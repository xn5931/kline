'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _index = require('./api/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.server = _http2.default.createServer(app);

// logger
app.use((0, _morgan2.default)('dev'));

// 3rd party middleware
app.use((0, _cors2.default)({

	exposedHeaders: _config2.default.corsHeaders

}));

app.use(_bodyParser2.default.json({

	limit: _config2.default.bodyLimit

}));

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next();
});

// connect to db
(0, _db2.default)(function (db) {
	// internal middleware
	app.use((0, _middleware2.default)({ config: _config2.default, db: db }));
	// api router
	app.use('/', (0, _index2.default)({ config: _config2.default, db: db }));
	//start
	app.server.listen(process.env.PORT || _config2.default.port, function () {
		console.log('Started on port ' + app.server.address().port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map