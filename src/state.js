var Store = require('./store');

class State extends Store {
	constructor(initial) {
		super(initial);
	}

	factory(initial) {
		return new State(initial);
	}

	is (obj) {
		return Object.is(this.get(), obj);
	}
}

module.exports = State;
