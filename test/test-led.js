var Led = require('../');
var assert = require('chai').assert;
var deepcopy = require('deep-copy');

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

	describe('when called with true', function(){
		it('should set the enabled property to true', function(){
			initialFalseLed.toggle(true);
			initialTrueLed.toggle(true);

			assert.isTrue(initialFalseLed.enabled);
			assert.isTrue(initialTrueLed.enabled);
		});
	});

	describe('when called with false', function(){
		it('should set the enabled property to false', function(){
			initialFalseLed.toggle(false);
			initialTrueLed.toggle(false);

			assert.isFalse(initialFalseLed.enabled);
			assert.isFalse(initialTrueLed.enabled);
		});
	});
});

describe('Led.set', function(){
	describe('when called with no arguments', function(){
		var options = {
			x: 1,
			y: 1,
			size: 10
		};

		var led = new Led(options.x, options.y, options.size, true);
		var copy = deepcopy(led);

		it ('should do nothing', function(){
			led.set();
			assert.deepEqual(led, copy);
		});
	});

	describe('when called with key and value', function(){
		var options = {
			x: 1,
			y: 1,
			size: 10
		};

		var led = new Led(options.x, options.y, options.size, true);

		beforeEach(function(){
			var led = new Led(options.x, options.y, options.size, true);
		});

		it ('should write new style props if unknown', function(){
			led.set('stroke', 'red');
			assert.propertyVal(led.state.get('styles'), 'stroke', 'red');
		});

		it ('should overwrite style props if known', function(){
			led.set('fillStyle', 'red');
			assert.propertyVal(led.state.get('styles'), 'fillStyle', 'red');
		});
	});
});
