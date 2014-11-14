led-canvas-led
==============
[![NPM version][0]][1] [![Build Status][2]][3] [![Coverage Status][4]][5] [![Dependency Status][6]][7] [![devDependency Status][8]][9]

Example LED class to be used by https://github.com/marionebl/led-canvas.

### Example
```js
var Led = require('led-canvas-led');

/**
 * Creates an instance of led-canvas-led with coordinates { x: 1, y: 1 }
 * and a size of 10 and with
 * @type {Led}
 */
var led = new Led(1, 1, 10)
```

### Minimal interface

#### Led.constructor
```
/**
 * Construct a new instance of Led
 * @param  {Integer} x - x coordinate of the new Led
 * @param  {Integer} y - y coordinate of the new Led
 * @param  {Integer} size - diameter in px of the new Led
 * @param {Boolean} enabled - enabled/disabled state of the new Led
 * @return {Led} new Led instance
 */
```

#### Led.toggle
``` 
/**
 * Toggles the led's state
 * @param {Boolean} [flag] Forced target state flag
 * @return {Led} Current instance of Led
 */
```

#### Led.set
``` 
/**
 * Sets a style property
 * @param {String} key - Name of the style property to set
 * @param {String} vale - Value to assign to the property with name [key]
 * @return {Led} Current instance of Led
 */
```

#### Led.render
```
/**
 * Renders the led on the given RenderingContext
 * @param {CanvasRenderingContext2D} context - Rendering context to paint on
 */
```

[0]: https://badge.fury.io/js/led-canvas-led.svg
[1]: http://badge.fury.io/js/led-canvas-led
[2]: https://travis-ci.org/marionebl/led-canvas-led.svg?branch=master
[3]: https://travis-ci.org/marionebl/led-canvas-led
[4]: https://img.shields.io/coveralls/marionebl/led-canvas-led.svg
[5]: https://coveralls.io/r/marionebl/led-canvas-led
[6]: https://david-dm.org/marionebl/led-canvas-led.svg
[7]: https://david-dm.org/marionebl/led-canvas-led
[8]: https://david-dm.org/marionebl/led-canvas-led/dev-status.svg
[9]: https://david-dm.org/marionebl/led-canvas-led#info=devDependencies
