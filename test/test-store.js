var Store = require('../lib/store');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Store.constructor(initial = {})', function () {
	describe('when constructed without any arguments', function () {
		it('should contain an empty object', function () {
			var store = new Store();
			expect(store._).to.be.empty;
		});
	});

	describe('when constructed with an object as first argument', function () {
		var store = null;
		var initial = null;

		beforeEach(function(){
			initial = { 'foo': 'bar' };
			store = new Store(initial);
		});

		it ('should contain an corresponding object', function () {
			assert.propertyVal(store._, 'foo', 'bar');
		});

		it ('should not contain the reference to the initial object', function () {
			assert.notStrictEqual(store._, initial);
		});
	});
});

describe('Store.get({key})', function () {
	var store = null;
	var initial = null;

	beforeEach(function () {
		initial = { 'foo': 'bar' };
		store = new Store(initial);
	});

	describe('when called without any arguments', function () {
		it('should return the entire internal object', function () {
			var result = store.get();
			assert.propertyVal(result, 'foo', 'bar');
		});

		it('should return the reference to the internal object', function () {
			var result = store.get();
			assert.strictEqual(result, store._);
		});
	});
});

describe('Store.set(key, {value})', function () {
	var store = null;
	var initial = null;

	beforeEach(function () {
		initial = { 'foo': 'bar' };
		store = new Store(initial);
	});

	describe('when called with an object as first argument', function () {
		var result = null;

		beforeEach(function () {
			result = store.set({ 'bar': 'foo' });
		});

		it('should merge it into its internal object', function () {
			assert.propertyVal(result._, 'foo', 'bar');
			assert.propertyVal(result._, 'bar', 'foo');
		});

		it('should return a new instance of Store', function () {
			assert.instanceOf(result, Store);
			assert.notStrictEqual(result, store);
		});
	});
});
