'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _tests = require('../models/tests');

var _tests2 = _interopRequireDefault(_tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;
	return (0, _resourceRouterMiddleware2.default)({

		/** Property name to store preloaded entity on `request`. */
		id: 'test',

		/** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
		load: function load(req, id, callback) {
			console.log(req);
			var test = _tests2.default.find(function (test) {
				return test.id === id;
			}),
			    err = test ? null : 'Not found';
			console.log(".......00", id);
			console.log(".......01");
			callback(err, test);
		},


		/** GET / - List all entities */
		index: function index(_ref2, res) {
			var params = _ref2.params;


			console.log(".......02", params);
			res.json(_tests2.default);
		},


		/** POST / - Create a new entity */
		create: function create(_ref3, res) {
			var body = _ref3.body;

			console.log(".......03");
			body.id = _tests2.default.length.toString(36);
			_tests2.default.push(body);
			res.json(body);
		},


		/** GET /:id - Return a given entity */
		read: function read(_ref4, res) {
			var test = _ref4.test;

			console.log(".......04");
			res.json(test);
		},


		/** PUT /:id - Update a given entity */
		update: function update(_ref5, res) {
			var test = _ref5.test,
			    body = _ref5.body;

			for (var key in body) {
				if (key !== 'id') {
					test[key] = body[key];
				}
			}
			res.sendStatus(204);
		},


		/** DELETE /:id - Delete a given entity */
		delete: function _delete(_ref6, res) {
			var test = _ref6.test;

			_tests2.default.splice(_tests2.default.indexOf(test), 1);
			res.sendStatus(204);
		}
	});
};
//# sourceMappingURL=test.js.map