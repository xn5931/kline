import resource from 'resource-router-middleware';
import tests from '../models/tests';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'test',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		console.log(req)
		let test = tests.find( test => test.id===id ),
			err = test ? null : 'Not found';
			console.log(".......00",id);
			console.log(".......01");
		callback(err, test);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		
		console.log(".......02",params);
		res.json(tests);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		console.log(".......03");
		body.id = tests.length.toString(36);
		tests.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ test }, res) {
		console.log(".......04");
		res.json(test);
	},

	/** PUT /:id - Update a given entity */
	update({ test, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				test[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ test }, res) {
		tests.splice(tests.indexOf(test), 1);
		res.sendStatus(204);
	}
});
