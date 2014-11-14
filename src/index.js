const arc = Math.PI * 2;
const white = 'rgba(255,255,255,1)';
const fadeout = 'rgba(255,255,255,.1)';

var Styles = require('./styles');
var State = require('./state');

class Led {
	/**
	 * Construct a new instance of Led
	 * @param  {Integer} x - x coordinate of the new Led
	 * @param  {Integer} y - y coordinate of the new Led
	 * @param  {Integer} size - diameter in px of the new Led
	 * @param {Boolean} enabled - enabled/disabled state of the new Led
	 * @return {Led} new Led instance
	 */
	constructor (x, y, size, enabled = false) {
		this.x = x;
		this.y = y;
		this.size = size;

		this.styles = new Styles({
			enabled: {
				fillStyle: white,
				shadowColor: white,
				shadowBlur: this.size/2 - (this.size/2 - this.size/7.5)
			},
			disabled: {
				fillStyle: fadeout
			}
		});

		this.state = new State({
			enabled: enabled
		});

		this.enabled = enabled;
	}

	/**
	 * Recaches the led's current state
	 * @return {Boolean} - if the current state is valid from cache
	 */
	cache () {
		if (this.state.is(this.prev)) {
			return true;
		}
		this.prev = this.state.get();
		return false;
	}

	/**
	 * Toggles the led's state
	 * @param {Boolean} [flag] Forced target state flag
	 * @return {Led} Current instance of Led
	 */
	toggle (flag) {
		if (typeof flag === 'boolean') {
			this.enabled = flag;
		} else {
			this.enabled = ! this.enabled;
		}

		return this;
	}

	/**
	 * Sets a style property
	 * @param {String} key - Name of the style property to set
	 * @param {String} vale - Value to assign to the property with name [key]
	 * @return {Led} Current instance of Led
	 */
	set(key, value) {
		if (typeof key === 'undefined') {
			return this;
		}

		this.cache();
		let styles = this.state.get('styles');
		styles[key] = value;
		this.state = this.state.set('styles', styles);
		return this;
	}

	set enabled (state) {
		this.cache();
		this.state = this.state.set('enabled', state);
		this.state = this.state.set('styles', this.styles.get(state ? 'enabled' : 'disabled'));
		return this;
	}

	get enabled () {
		return this.state.get('enabled');
	}

	/**
	 * Constructs the led graphics based on its state and style properties
	 * @param {CanvasRenderingContext2D} context - Rendering context to paint on
	 */
	figure(context) {
		let x = this.x*this.size;
		let y = this.y*this.size;
		let radius = this.size/2;
		let inner = radius - this.size/7.5;

		if (typeof this.prev !== 'undefined') {
			context.clearRect(x, y, this.size, this.size);
		}

		context.beginPath();
		context.arc(x + radius, y + radius, inner, 0, arc);

		let styles = this.state.get('styles') || {};

		Object.keys(styles).forEach(function(property){
			context[property] = styles[property];
		});

		context.fill();
	}

	/**
	 * Renders the led on the given RenderingContext
	 * @param {CanvasRenderingContext2D} context - Rendering context to paint on
	 */
	render (context) {
		if (this.cache()) {
			return;
		}

		context.save();
		this.figure(context);
		context.restore();
	}
}

module.exports = Led;
