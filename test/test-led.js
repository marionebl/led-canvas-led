var Led = require('../');
var assert = require('chai').assert;

describe('Led.constructor', function() {
	describe('when constructed', function() {
		var led = null;
		var options = null;

		beforeEach(function() {
			options = {
				x: 1,
				y: 1,
				size: 10
			};
			led = new Led(options.x, options.y, options.size);
		});

		it('should return an instance of Led', function() {
			assert.instanceOf(led, Led);
		});

		it('should return an instance that contains the passed options', function(){
			assert.propertyVal(led, 'x', options.x);
			assert.propertyVal(led, 'y', options.y);
			assert.propertyVal(led, 'size', options.size);
		});

		it('should have an enabled property defaulting to false', function(){
			var explicitTrueLed = new Led(options.x, options.y, options.size, true);
			var explicitFalseLed = new Led(options.x, options.y, options.size, false);

			assert.propertyVal(explicitTrueLed, 'enabled', true);
			assert.propertyVal(explicitFalseLed, 'enabled', false);
			assert.propertyVal(led, 'enabled', false);
		});
	});
});

describe('Led.toggle', function() {
	var options = null;
	var initialTrueLed = null;
	var initialFalseLed = null;

	beforeEach(function(){
		options = {
			x: 1,
			y: 1,
			size: 10
		};

		initialTrueLed = new Led(options.x, options.y, options.size, true);
		initialFalseLed = new Led(options.x, options.y, options.size, false);
	});

	describe('when called without any arguments', function(){
		it('should invert the enabled property', function(){
			initialFalseLed.toggle();
			initialTrueLed.toggle();

			assert.isTrue(initialFalseLed.enabled);
			assert.isFalse(initialTrueLed.enabled);
		});
	});
});
