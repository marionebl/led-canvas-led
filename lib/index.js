const arc = Math.PI * 2;
const white = 'rgba(255,255,255,1)';
const fadeout = 'rgba(255,255,255,.1)';

var Styles = require('./styles');
var State = require('./state');

class Led {
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
			enabled: enabled,
			styles: new Styles(this.styles.get(enabled ? 'enabled' : 'disabled'))
		});
	}

	cache () {
		this.prev = this.state.get();
	}

	toggle (flag) {
		if (typeof flag === 'boolean') {
			this.enabled = flag;
		} else {
			this.enabled = ! this.enabled;
		}

		return this;
	}

	set (key, value) {
		this.cache();
		let styles = this.state.get('styles').set(key, value);
		this.state = this.state.set('styles', styles);
		return this;
	}

	set enabled (state) {
		this.cache();
		this.state = this.state.set('enabled', state);
		this.state = this.set('styles', this.styles.get(state ? 'enabled' : 'disabled'));
		return this;
	}

	get enabled () {
		return this.state.get('enabled');
	}

	figure(context) {
		let x = this.x*this.size;
		let y = this.y*this.size;
		let radius = this.size/2;
		let inner = radius - this.size/7.5;

		if (typeof this.prev !== 'undefined') {
			context.clearRect(x, y, this.size, this.size);
		}

		context.imageSmoothingEnabled = false;
		context.beginPath();
		context.arc(x + radius, y + radius, inner, 0, arc);

		this.state.get('styles').forEach(function(property, value){
			context[property] = value;
		});

		context.fill();
	}

	render (context) {
		if (this.state.is(this.prev)) return;
		this.prev = this.state.get();

		context.save();
		this.figure(context);
		context.restore();
	}
}

module.exports = Led;
