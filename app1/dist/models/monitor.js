'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _dbhelper = require('./dbhelper');

var _dbhelper2 = _interopRequireDefault(_dbhelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.price = function (collection, obj, cb) {

	_dbhelper2.default.find(collection, obj, function (mas, err) {

		if (!err && mas && mas[0] !== undefined) {
			cb(mas);
		} else {
			console.log(err);return;
		}
	});
};
//# sourceMappingURL=monitor.js.map