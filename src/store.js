var objectAssign = require('object-assign');

class Store{
	constructor(initial = {}) {
		this._ = objectAssign({}, initial);
	}

	factory(initial) {
		return new Store(initial);
	}

	set(key, value) {
		let obj = {};

		if (typeof value === 'undefined' && typeof key === 'object') {
			obj = key;
		} else {
			obj[key] = value;
		}

		return this.factory(objectAssign({}, this._, obj));
	}

	get(key) {
		if (typeof key === 'undefined') {
			return this._;
		} else {
			return this._[key];
		}
	}
}

module.exports = Store;
