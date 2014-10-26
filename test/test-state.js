var State = require('../lib/state');
var assert = require('chai').assert;

describe('State.constructor(initial = {})', function () {
	describe('when constructed', function () {
		it('should return an instance of State', function () {
			var result = new State();
			assert.instanceOf(result, State);
		});
	});
});

describe('State.is(object)', function () {
	it('should return true if passed object is the same as internal', function () {
		var state = new State({
			foo: 'bar'
		});

		assert.isTrue(state.is(state._));
	});

	it('should return false if passed object is not the same as internal', function () {
		var state = new State({
			foo: 'bar'
		});

		assert.isFalse(state.is({ foo: 'bar' }));
	});
});
