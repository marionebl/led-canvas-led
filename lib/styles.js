var Store = require('./store');

class Styles extends Store {
	constructor (initial) {
		super(initial);
	}

	factory (initial) {
		return new Styles(initial);
	}

	forEach (callback) {
		Object.keys(this._).forEach((key) => {
			callback(key, this.get(key));
		});
	}
}

module.exports = Styles;
