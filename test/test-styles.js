var Styles = require('../lib/styles');
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Styles.constructor(initial = {})', function () {
	describe('when constructed', function () {
		it('should return an instance of Styles', function () {
			var result = new Styles();
			assert.instanceOf(result, Styles);
		});
	});
});

describe('Styles.forEach(cb)', function () {
	describe('when called with a function as first argument', function () {
		var styles = null;
		var callback = null;

		beforeEach(function(){
			callback = sinon.spy();

			styles = new Styles({
				foo: 'bar',
				bar: 'foo'
			});

			styles.forEach(callback);
		});

		it('should execute the callback once for every property', function () {
			assert.equal(callback.callCount, Object.keys(styles.get()).length);
		});

		it('should execute the callback with property key and property value', function () {
			assert.equal(callback.firstCall.args[0], 'foo');
			assert.equal(callback.firstCall.args[1], 'bar');
			assert.equal(callback.secondCall.args[0], 'bar');
			assert.equal(callback.secondCall.args[1], 'foo');
		});
	});

	describe('when called on empty instance', function () {
		var styles = new Styles();
		var callback = sinon.spy();
		styles.forEach(callback);

		it('should never execute the callback', function () {
			assert.isFalse(callback.called);
		});
	});
});
