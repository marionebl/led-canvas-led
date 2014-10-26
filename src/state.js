var Store = require('./store');

class State extends Store {
	constructor(initial) {
		super(initial);
	}

	factory(initial) {
		return new State(initial);
	}
}

module.exports = State;
